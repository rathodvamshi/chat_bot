import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import SVC
from sklearn.metrics import classification_report
import joblib

# Load dataset with fallback for parsing errors
def load_data(file_path):
    try:
        data = pd.read_csv(file_path)
        print("✅ Data loaded successfully.")
        print("Columns in dataset:", data.columns.tolist())
        return data
    except pd.errors.ParserError as e:
        print(f"❌ CSV parsing error: {e}")
        print("Attempting to skip bad lines...")
        try:
            data = pd.read_csv(file_path, on_bad_lines='skip')  # Skip problematic rows
            print("✅ Loaded with skipped lines.")
            print("Columns in dataset:", data.columns.tolist())
            return data
        except Exception as e2:
            print(f"❌ Failed to load even with skipping: {e2}")
            exit(1)
    except Exception as e:
        print(f"❌ Error loading data: {e}")
        exit(1)

# Balance classes by oversampling
def balance_classes(df, label_col='label'):
    max_size = df[label_col].value_counts().max()
    balanced_df = df.groupby(label_col, group_keys=False).apply(
        lambda x: x.sample(max_size, replace=True)
    ).reset_index(drop=True)
    return balanced_df

# Main training function
def train_model(text_col='text', label_col='label'):
    # Load data
    data = load_data(r'C:\Users\vamsh\Source\chat-bot\ml-mern-chatbot\ml\dataset.csv')

    # Validate columns
    if text_col not in data.columns or label_col not in data.columns:
        missing = [col for col in [text_col, label_col] if col not in data.columns]
        print(f"❌ Missing columns: {missing}. Expected 'text' and 'label' (or specified names).")
        exit(1)

    # Display class distribution
    print("\n🔍 Class Distribution:\n", data[label_col].value_counts())

    # Balance dataset
    data = balance_classes(data, label_col)
    print("\n✅ Class distribution after balancing:\n", data[label_col].value_counts())

    # Extract features and labels
    X = data[text_col]
    y = data[label_col]

    # Train-test split
    num_classes = len(np.unique(y))
    total_samples = len(y)
    min_test_size = num_classes
    test_size = max(0.5, min_test_size / total_samples)  # 50% split

    try:
        X_train, X_test, y_train, y_test = train_test_split(
            X, y, test_size=test_size, stratify=y, random_state=42
        )
        print(f"✅ Data split successfully: Train size = {len(X_train)}, Test size = {len(X_test)}")
    except Exception as e:
        print(f"❌ Error during train-test split: {e}")
        exit(1)

    # Vectorize text data
    vectorizer = TfidfVectorizer(
        max_features=5000,
        ngram_range=(1, 2),
        stop_words='english'
    )
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)

    # Train SVM model
    model = SVC(
        kernel='linear',
        C=1.0,
        probability=True,
        random_state=42
    )
    model.fit(X_train_vec, y_train)

    # Evaluate model
    train_score = model.score(X_train_vec, y_train)
    test_score = model.score(X_test_vec, y_test)
    print(f"✅ Model performance: Train accuracy = {train_score:.4f}, Test accuracy = {test_score:.4f}")

    # Detailed evaluation
    y_pred = model.predict(X_test_vec)
    print("\n📊 Classification Report:\n", classification_report(y_test, y_pred, zero_division=0))

    # Save model and vectorizer
    joblib.dump(model, 'chatbot_model.pkl')
    joblib.dump(vectorizer, 'vectorizer.pkl')
    print("✅ Model and vectorizer saved successfully.")

if __name__ == '__main__':
    train_model(text_col='text', label_col='label')