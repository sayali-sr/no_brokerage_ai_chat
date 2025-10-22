# frontend/app.py
import streamlit as st
import requests

st.set_page_config(page_title="NoBrokerage AI Chat", page_icon="🏠")

st.title("🏡 NoBrokerage AI Property Chat")

# Session state for chat messages
if "messages" not in st.session_state:
    st.session_state.messages = []

# User input
user_input = st.text_input("Ask me about properties (e.g., '3BHK flat in Pune under 1.2 Cr')")

if st.button("Send") and user_input:
    st.session_state.messages.append({"role": "user", "content": user_input})
    
    # Call backend API
    try:
        response = requests.post(
            "http://localhost:5000/api/chat",
            json={"message": user_input}
        ).json()
        
        summary = response.get("summary", "No summary available.")
        results = response.get("results", [])

        st.session_state.messages.append({"role": "bot", "content": summary})

        # Display project cards
        for project in results:
            st.markdown(f"### {project.get('projectName')}")
            st.markdown(f"**Address:** {project.get('fullAddress', '-')}")
            st.markdown(f"**BHK:** {project.get('customBHK', '-')}")
            st.markdown(f"**Price:** ₹{project.get('price', '-')}")
            st.markdown(f"**Possession:** {project.get('possessionDate', '-')}")
            st.markdown(f"**Summary:** {project.get('projectSummary', '-')}")
            st.markdown("---")
    except Exception as e:
        st.error(f"Error connecting to backend: {e}")

# Display chat history
for msg in st.session_state.messages:
    if msg["role"] == "user":
        st.markdown(f"**You:** {msg['content']}")
    else:
        st.markdown(f"**Bot:** {msg['content']}")
