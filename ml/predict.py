# import joblib
# import sys
# import pandas as pd

# # Load model, vectorizer, and training data with error handling
# try:
#     model = joblib.load(r'C:\Users\vamsh\Source\chat-bot\ml-mern-chatbot\ml\chatbot_model.pkl')
#     vectorizer = joblib.load(r'C:\Users\vamsh\Source\chat-bot\ml-mern-chatbot\ml\vectorizer.pkl')
#     # Load the training dataset with fallback for parsing errors
#     try:
#         data = pd.read_csv(r'C:\Users\vamsh\Source\chat-bot\ml-mern-chatbot\ml\dataset.csv')
#     except pd.errors.ParserError as e:
#         print(f"❌ CSV parsing error: {e}")
#         print("Attempting to skip bad lines...")
#         data = pd.read_csv(r'C:\Users\vamsh\Source\chat-bot\ml-mern-chatbot\ml\dataset.csv', on_bad_lines='skip')
#         print("✅ Loaded dataset with skipped lines.")
#     print("Columns in dataset:", data.columns.tolist())
#     if 'text' not in data.columns or 'label' not in data.columns:
#         raise ValueError("Dataset must have 'text' and 'label' columns.")
#     print("🤖 Chatbot is ready to chat! (Type 'exit', 'quit', or 'bye' to stop)")
# except FileNotFoundError as e:
#     print(f"❌ File not found: {e}. Please ensure model, vectorizer, and dataset files exist.")
#     sys.exit(1)
# except Exception as e:
#     print(f"❌ Error loading model, vectorizer, or data: {e}")
#     sys.exit(1)

# # Get response function with exact match and confidence-based logic
# def get_response(user_input):
#     if not user_input.strip():
#         return "I didn't catch that. Could you repeat?"

#     # Check for exact match in training data
#     if user_input in data['text'].values:
#         exact_response = data[data['text'] == user_input]['label'].iloc[0]
#         return f"{exact_response} (Exact match from training data)"

#     # Transform user input and predict
#     try:
#         input_vector = vectorizer.transform([user_input])
#         prediction = model.predict(input_vector)[0]
#         confidence = model.predict_proba(input_vector).max() * 100

#         # Dynamic responses based on confidence level
#         if confidence >= 80:
#             return f"{prediction} (Confidence: {confidence:.2f}%)"
#         elif confidence >= 50:
#             return f"I think it might be '{prediction}' (Confidence: {confidence:.2f}%)"
#         else:
#             return "I'm not quite sure what you mean. Could you rephrase that? (Low confidence)"
#     except Exception as e:
#         return f"Oops! Something went wrong: {e}"

# # Interactive chat loop
# exit_keywords = {'exit', 'quit', 'bye'}

# while True:
#     try:
#         user_input = input("You: ").strip()
#         if user_input.lower() in exit_keywords:
#             print("👋 Goodbye! Talk to you soon.")
#             break

#         response = get_response(user_input)
#         print(f"Bot: {response}")

#     except KeyboardInterrupt:
#         print("\n👋 Goodbye! Chat session ended.")
#         break
#     except Exception as e:
#         print(f"Bot: Oops! An unexpected error occurred: {e}")
#         continue



# ................................................................................................................................

# ml/predict.py



# C:\Users\vamsh\Source\chat-bot\ml-mern-chatbot\ml\predict.py
import joblib
import sys
import pandas as pd

try:
    model = joblib.load(r'C:\Users\vamsh\Source\chat-bot\ml-mern-chatbot\ml\chatbot_model.pkl')
    vectorizer = joblib.load(r'C:\Users\vamsh\Source\chat-bot\ml-mern-chatbot\ml\vectorizer.pkl')
    try:
        data = pd.read_csv(r'C:\Users\vamsh\Source\chat-bot\ml-mern-chatbot\ml\dataset.csv')
    except pd.errors.ParserError as e:
        data = pd.read_csv(r'C:\Users\vamsh\Source\chat-bot\ml-mern-chatbot\ml\dataset.csv', on_bad_lines='skip')
    if not {'text', 'label'}.issubset(data.columns):
        raise ValueError("Dataset must contain 'text' and 'label' columns")
except FileNotFoundError as e:
    print(f"File not found: {e}", file=sys.stderr)
    sys.exit(1)
except Exception as e:
    print(f"Error loading resources: {e}", file=sys.stderr)
    sys.exit(1)

def get_response(user_input):
    if not user_input.strip():
        return "I didn't catch that. Could you repeat?"
    match = data[data['text'].str.lower() == user_input.lower()]
    if not match.empty:
        return match.iloc[0]['label']
    try:
        input_vector = vectorizer.transform([user_input])
        prediction = model.predict(input_vector)[0]
        confidence = model.predict_proba(input_vector).max() * 100
        if confidence >= 80:
            return f"{prediction} (Confidence: {confidence:.2f}%)"
        elif confidence >= 50:
            return f"I'm fairly sure it's '{prediction}' (Confidence: {confidence:.2f}%)"
        else:
            return "I'm not sure. Could you rephrase that? (Low confidence)"
    except Exception as e:
        return f"Oops! Something went wrong: {e}"

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("No input provided", file=sys.stderr)
        sys.exit(1)
    user_input = sys.argv[1]
    response = get_response(user_input)
    print(response)