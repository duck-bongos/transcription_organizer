# transcription_organizer
A web app **intended to run locally** that will allow a Psychologist to cut down on the amount of time he spends organizing and editing his transcription data. 

__This is a highly tailored app for his needs and is not supposed to represent transcription organization as a whole.__

## Usage
1. Click the blue `<> CODE` button. 
2. Scroll to the bottom and click "download zip"
3. When the zip file, called `transcription_organizer` download is complete, open the zip file.
4. In the new `transcription_organizer` folder, click on the `organizer.html` file. 
5. This will open a browser window. **THIS WINDOW IS NOT CONNECTED TO THE INTERNET**. I know this because it still works when I turn my Wi-Fi off.
6. You will see four main sections:
    - Intake form: A little information about the patient
    - Save to Word: A button to save the current form 
    - Transcription upload: A drag and drop section or click to upload section
    - A list of headers and subheaders: These are from the template form
7. First - fill out the intake form. **"Age" is not on there**. It is calculated given the date of birth of the patient. 
8. Second, upload a transcription by dragging or dropping the file onto the button, or click the button to open a browser.
9. Now scroll down. On the left, you will see headings in bold white text on a dark blue background bubbles (Heading bubble = HB) and subheadings in italicized white text on a lighter blue background (SB). On the right, you will see the transcription paragraphs, split into the lightest blue bubbles of their own.
10. Select each transcription bubble (TB) by clicking and dragging it around. 
11. Drag the TB up until it is below the section you want to add it to. For example, if you want to put a transcription bubble into the "Chief Complaint" section, make sure the TB is below the HB "Chief Complaint" and above "Personal History".
12. Only release the bubble when you see a green circle with a white plus sign inside it next to your cursor. If you do not see this symbol, the TB will return to its original location.
13. When you are done rearranging the bubbles, scroll up.
14. Click 'Save to Word'. A file called `transcription.docx` should begin to download. Click it to open.

### If step 14 fails...
1. If the file does not open, navigate to [google docs](https://docs.google.com/document/u/0/).
2. Create a blank document (far left option in the template gallery)
3. In the top left click `File > Open`. Select the recently downloaded `transcription.docx`. The file will open.
4. Edit the file as you see fit.
5. To download the file, click `File > Download` and select the output format (.docx, .pdf, etc) in the menu on the right.

## Limitations
- No guarantee this loads directly in Microsoft Word. Guaranteed to load in Google Docs.
- If you don't fill out the information how you want, it won't work or look how you want
- No checks to enforce that all fields exist
- No checks to ensure a transcription is uploaded
- No spell check
- No checks to ensure the headers and subheaders remain in the current order - they can be moved by accident
- No way to delete headers or subheaders
- No way to delete transcription items
- No checks to enforce that the date of birth is after the date of evaluation
- All patients' battery is "Clinical Interview" as of right now
- No headers in Microsoft Word
