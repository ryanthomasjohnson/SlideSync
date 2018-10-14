# Inspiration
As students at the University of Michigan, our lectures are often crowded with many students. We wanted to design a project that would help bring students in lecture together and leverage the amount of students to improve the learning experience.

# What it does
SlideSync has three main features that each student in a lecture can access:
- Slides synchronized to what the Lecturer is currently teaching
- Collaborative note taking where students come together to create notes
- Chat where students can talk to each other and the professor

Synchronized slides allow for each student to have a visual for what the professor is talking about without having to look at a far away projector screen. The professor can keep the pace of the class by making sure each student is focused on what they are currently teaching.

Collaborative note taking allows students to pool their energy to create a clearer understanding of each topic. Different interpretations of what is being taught by the professor might resonate more with different students allowing for better overall understanding.

Live chat also provides an opportunity for students to collaborate with each other. Chat allows for students to ask questions to peers and the professor without interrupting class. If students can answer questions instead of the professor, less time is spent answering questions and more is spent learning new content.

# How we built it
We approached this project knowing that we would need some sort of solution for tracking data in realtime. We found that firebase suited our needs very well; by using firestore and realtime databases we made challenges like syncing user's cursors and text much more achievable. We also knew that we could use Twilio's web chat API to easily implement a live chat. All of this integrated very well with our ReactJS frontend and React's state management made tracking what each component was displaying easy. Finally, we used Google Cloud Platform to easily host the production build of our React application.

# Challenges we ran into
Syncing up multiple users and their cursors in a text box can be really difficult. There are not very many libraries for displaying PDFs in React and the most popular one was throwing an error that we couldn’t figure out how to fix. We then had to switch to another library. We then figured out we couldn’t rescale the PDF easily but we ended up finding a solution that works for standard sized powerpoint slides. Lastly, it took us quite a while to get up an running with the Twillio chat API. The issue ending up being that a single variable was wrong on one of our lines of code that prevented us from being properly authenticated.

# Accomplishments that we're proud of
This was everyone on our team’s first Hackathon and we were very happy with how our idea turned out. We came into this having no idea what we were going to build and we managed to find an interesting problem and solve it. We each got to learn a lot and were exposed to lots of new technologies and will be able to use the skills we learned in future projects. We also were able to reach several of our stretch goals that seemed really far away at the beginning of the project such as having a working chat, being able to authenticate a user, and creating separate roles for professors and students.


# What we learned
Nobody on the team had used Firebase before. Exploring the wide variety of things it could do was super interesting and everyone on the team explored features of it whether it be functions, authentication, or database. We also learned how to use the Twilio API to make a chat feature for our app.

# What's next for SlideSync
We think it would be useful if the annotations the professor makes would show up on the slide. It would also be useful if the user did not have to view the slide that the professor was currently looking at and instead could go at their own pace but still have an option to jump to the slide the professor. Lastly, we feel that adding quizzes could be a useful integration that would allow the professor to gauge the students knowledge levels. A professor could create a quiz and send it out to all the students in the current session, and then view the results on their computer.
