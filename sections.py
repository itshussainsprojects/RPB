import streamlit as st

class SectionManager:
    def __init__(self):
        self.section_list = [
            "Title","Abstract","Literature Review","Methodology",
            "Results","Discussion","Conclusion","References","Appendix"
        ]

    def render_section(self, section):
        st.subheader(f"📌 {section}")
        text = st.text_area(f"{section} Text", key=f"{section}_text", height=140)
        images = st.file_uploader(f"Upload Images for {section}",
                                  type=["png","jpg","jpeg"],
                                  accept_multiple_files=True,
                                  key=f"{section}_img")
        table_data = st.text_area(f"Add Table Data (CSV Format)",
                                  key=f"{section}_table",
                                  placeholder="Row1,Data1,Data2\nRow2,Data1,Data2")
        # store into session state
        st.session_state.sections[section] = {"text": text, "images": images, "table": table_data}
