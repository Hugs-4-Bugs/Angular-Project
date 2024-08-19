import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  navOpen = false;
  chatVisible = false;

  predefinedQuestions: string[] = [
    "What skills do you have?",
    "What is your education?",
    "What is your experience?",
    "What languages do you speak?",
    "What certifications do you have?",
    "What projects have you worked on?",
    "What tools are you proficient with?",
    "What programming languages are you familiar with?",
    "What web technologies are you experienced in?",
    "What cloud technologies have you worked with?",
    "What databases are you skilled in?",
    "What version control systems do you use?",
    "What frameworks are you comfortable with?",
    "What operating systems are you familiar with?",
    "What development tools do you prefer?",
    "What is your favorite programming language?",
    "What is your preferred IDE?",
    "What are your hobbies?",
    "What motivates you?",
    "What are your career goals?"
  ];

  constructor() { }

  ngOnInit(): void {
    document.addEventListener('DOMContentLoaded', () => {
      const menuBtn = document.querySelector('.menu-btn');
      const menu = document.querySelector('.menu');

      if (menuBtn && menu) {
        menuBtn.addEventListener('click', () => {
          menu.classList.toggle('active');
        });
      }
    });
  }

  toggleNav() {
    this.navOpen = !this.navOpen;
  }

  showContent(pageId: string) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
      page.classList.remove('active');
    });
    const activePage = document.getElementById(pageId);
    if (activePage) {
      activePage.classList.add('active');
    }
  }

  toggleChat() {
    this.chatVisible = !this.chatVisible;
    const chatBox = document.getElementById("chat-box");
    if (chatBox) {
      chatBox.style.display = this.chatVisible ? "block" : "none";
      if (this.chatVisible) {
        const inputField = document.getElementById("chat-input") as HTMLInputElement;
        if (inputField) {
          inputField.focus();
        }
        this.displayPredefinedQuestions();
      }
    }
  }

  displayPredefinedQuestions() {
    const chatBody = document.getElementById("chat-body");
    if (chatBody) {
      chatBody.innerHTML = ""; // Clear previous messages

      const shuffledQuestions = this.shuffleArray([...this.predefinedQuestions]);

      for (let i = 0; i < 3; i++) {
        const userQuestion = document.createElement("div");
        userQuestion.className = "message you"; // Add 'you' class for user's messages
        userQuestion.textContent = shuffledQuestions[i];
        userQuestion.setAttribute("onclick", `sendMessageFromPredefinedQuestion('${shuffledQuestions[i]}')`);
        chatBody.appendChild(userQuestion);
      }

      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  shuffleArray(array: string[]): string[] {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  sendMessageFromPredefinedQuestion(message: string) {
    const chatBody = document.getElementById("chat-body");
    if (chatBody) {
      const newMessage = document.createElement("div");
      newMessage.textContent = "You: " + message;
      chatBody.appendChild(newMessage);
      chatBody.scrollTop = chatBody.scrollHeight;

      this.botReply(message);

      const predefinedQuestionsDivs = document.querySelectorAll(".message.you");
      predefinedQuestionsDivs.forEach(questionDiv => {
        chatBody.removeChild(questionDiv);
      });
    }
  }

  getPredefinedAnswer(index: number): string {
    const predefinedAnswers = [
      "I have expertise in Core Java, SQL, Data Structures, Spring Boot, Hibernate, MySQL, AWS CPE, Collection Framework, Exception Handling, Postman, Jira, Jenkins, Chef, Ansible, Git, DevOps, Agile Methodology, Kanban Board, RESTful API, JPA, Debugging, Authentication, AWS Deployment, Problem Solving, Software Development, Backend Development, Java Development, Angular, HTML, CSS, Database.",
      "I graduated in 2023 with a Bachelor of Engineering (B.E.) in Computer Science & Engineering from Visvesvaraya Technological University.",
      "I have less than 1 year of experience working as a software engineer.",
      "I speak English, Hindi, and Bhojpuri.",
      "I am HackerRank Certified Software Engineer, Postman API Expert, Microsoft Azure AI Cloud",
      "I have worked on projects like Employee Info, CryptoCurrency Price Prediction, Hospital-Management-Applications, Bitcoin-Mining-App, Blog_Application, AI-Text-Summarizer-Application, Angular-CRUD-Application, Bitcoin-Mining-Application, MultiFileUpload-Using-Spring-Boot-Application, Flight_Reservation_Project, Hotel-Management-project, Angular-weather-component, Angular-temperatureConverter, BMI-Calculator, BUDDY-A-face-recognition-based-voice-assistant etc.",
      "I am proficient with tools like Git, Docker, Android Studio, Jira, Spring Tool Suite (STS), IntelliJ IDEA, Eclipse, VS Code, Postman.",
      "I am familiar with Java, Spring Boot, Angular and Trading.",
      "I am experienced in RESTful APIs, HTML, CSS, AngularJS, Bootstrap, and JWT.",
      "I have worked with AWS cloud technologies.",
      "I am skilled in MySQL, SQL, and PostgreSQL.",
      "I use Git and Bitbucket for version control.",
      "I am comfortable with Spring, Spring Boot, and Angular frameworks.",
      "I am familiar with Windows, Linux, Fedora, Ubuntu and macOS.",
      "I prefer using IntelliJ and Visual Studio Code as my IDEs.",
      "My favorite programming language is Java.",
      "My preferred IDE is IntelliJ IDEA.",
      "My hobbies include reading, traveling, and F&O + Stock + Crypto + Forex Trading.",
      "I am motivated by challenging projects and opportunities for growth.",
      "My career goals include becoming a senior software engineer and contributing to impactful projects."
    ];
    return predefinedAnswers[index];
  }

  botReply(question: string) {
    const chatBody = document.getElementById("chat-body");
    if (chatBody) {
      const typingIndicator = document.createElement("div");
      typingIndicator.className = "message typing-prabhat";
      typingIndicator.textContent = "Prabhat is typing...";
      chatBody.appendChild(typingIndicator);

      setTimeout(() => {
        chatBody.removeChild(typingIndicator);

        const botMessage = document.createElement("div");
        botMessage.className = "message prabhat";

        const answer = this.isBasicQuestion(question) ? this.getBasicResponse(question) : this.generateResponse(question);
        const characters = answer.split("");
        let index = 0;

        const interval = setInterval(() => {
          if (index < characters.length) {
            botMessage.textContent += characters[index];
            chatBody.appendChild(botMessage);
            chatBody.scrollTop = chatBody.scrollHeight;
            index++;
          } else {
            clearInterval(interval);
            this.displayNextPredefinedQuestions();
          }
        }, 50); // Adjust delay as needed for the typing speed
      }, 600); // Adjust delay as needed for the "typing" delay
    }
  }

  isBasicQuestion(question: string): boolean {
    const basicQuestions = [
      "hi", "hello", "good morning", "good afternoon", "good evening", "thank you", "education", "skill", "skills", "experience", "project", "projects", "name", "from", "where are you from", "tell me about yourself", "how are you", "who are you", "tell me something about prabhat", "who is Prabhat Kumar", "who is Prabhat", "about yourself"
    ];
    return basicQuestions.includes(question.toLowerCase());
  }

  getBasicResponse(question: string): string {
    const basicResponses = {
      "hi": "Hello! How can I assist you today?",
      "hello": "Hi there! What can I do for you?",
      "good morning": "Good morning! How can I help you?",
      "good afternoon": "Good afternoon! What can I do for you?",
      "good evening": "Good evening! How can I assist you?",
      "thank you": "You're welcome!",
      "education": "I graduated in 2023 with a Bachelor of Engineering (B.E.) in Computer Science & Engineering from Visvesvaraya Technological University.",
      "skill": "I have expertise in Core Java, SQL, Data Structures, Spring Boot, Hibernate, MySQL, AWS CPE, Collection Framework, Exception Handling, Postman, Jira, Jenkins, Chef, Ansible, Git, DevOps, Agile Methodology, Kanban Board, RESTful API, JPA, Debugging, Authentication, AWS Deployment, Problem Solving, Software Development, Backend Development, Java Development, Angular, HTML, CSS, Database.",
      "skills": "I have expertise in Core Java, SQL, Data Structures, Spring Boot, Hibernate, MySQL, AWS CPE, Collection Framework, Exception Handling, Postman, Jira, Jenkins, Chef, Ansible, Git, DevOps, Agile Methodology, Kanban Board, RESTful API, JPA, Debugging, Authentication, AWS Deployment, Problem Solving, Software Development, Backend Development, Java Development, Angular, HTML, CSS, Database.",
      "experience": "I have less than 1 year of experience working as a software engineer.",
      "project": "I have worked on projects like Employee Info, CryptoCurrency Price Prediction, Hospital-Management-Applications, Bitcoin-Mining-App, Blog_Application, AI-Text-Summarizer-Application, Angular-CRUD-Application, Bitcoin-Mining-Application, MultiFileUpload-Using-Spring-Boot-Application, Flight_Reservation_Project, Hotel-Management-project, Angular-weather-component, Angular-temperatureConverter, BMI-Calculator, BUDDY-A-face-recognition-based-voice-assistant etc.",
      "projects": "I have worked on projects like Employee Info, CryptoCurrency Price Prediction, Hospital-Management-Applications, Bitcoin-Mining-App, Blog_Application, AI-Text-Summarizer-Application, Angular-CRUD-Application, Bitcoin-Mining-Application, MultiFileUpload-Using-Spring-Boot-Application, Flight_Reservation_Project, Hotel-Management-project, Angular-weather-component, Angular-temperatureConverter, BMI-Calculator, BUDDY-A-face-recognition-based-voice-assistant etc.",
      "name": "My name is Prabhat Kumar.",
      "from": "I am from India.",
      "where are you from": "I am from India.",
      "tell me about yourself": "I am Prabhat Kumar, a recent graduate with expertise in Core Java, SQL, Data Structures, Spring Boot, Hibernate, MySQL, AWS CPE, and more. I have less than 1 year of experience working as a software engineer.",
      "how are you": "I'm doing great, thank you! How can I assist you today?",
      "who are you": "I am Prabhat Kumar, a recent graduate with expertise in Core Java, SQL, Data Structures, Spring Boot, Hibernate, MySQL, AWS CPE, and more. I have less than 1 year of experience working as a software engineer.",
      "tell me something about prabhat": "I am Prabhat Kumar, a recent graduate with expertise in Core Java, SQL, Data Structures, Spring Boot, Hibernate, MySQL, AWS CPE, and more. I have less than 1 year of experience working as a software engineer.",
      "who is Prabhat Kumar": "I am Prabhat Kumar, a recent graduate with expertise in Core Java, SQL, Data Structures, Spring Boot, Hibernate, MySQL, AWS CPE, and more. I have less than 1 year of experience working as a software engineer.",
      "who is Prabhat": "I am Prabhat Kumar, a recent graduate with expertise in Core Java, SQL, Data Structures, Spring Boot, Hibernate, MySQL, AWS CPE, and more. I have less than 1 year of experience working as a software engineer.",
      "about yourself": "I am Prabhat Kumar, a recent graduate with expertise in Core Java, SQL, Data Structures, Spring Boot, Hibernate, MySQL, AWS CPE, and more. I have less than 1 year of experience working as a software engineer."
    };
    // return basicResponses[question.toLowerCase()] || "I'm sorry, I don't have an answer for that question.";
        return  "I'm sorry, I don't have an answer for that question.";

  }

  generateResponse(question: string): string {
    const predefinedQuestions = [
      "What skills do you have?",
      "What is your education?",
      "What is your experience?",
      "What languages do you speak?",
      "What certifications do you have?",
      "What projects have you worked on?",
      "What tools are you proficient with?",
      "What programming languages are you familiar with?",
      "What web technologies are you experienced in?",
      "What cloud technologies have you worked with?",
      "What databases are you skilled in?",
      "What version control systems do you use?",
      "What frameworks are you comfortable with?",
      "What operating systems are you familiar with?",
      "What development tools do you prefer?",
      "What is your favorite programming language?",
      "What is your preferred IDE?",
      "What are your hobbies?",
      "What motivates you?",
      "What are your career goals?"
    ];

    const index = predefinedQuestions.indexOf(question);
    if (index !== -1) {
      return this.getPredefinedAnswer(index);
    } else {
      return "I'm sorry, I don't have an answer for that question.";
    }
  }

  displayNextPredefinedQuestions() {
    const chatBody = document.getElementById("chat-body");
    if (chatBody) {
      chatBody.innerHTML = ""; // Clear previous messages

      const shuffledQuestions = this.shuffleArray([...this.predefinedQuestions]);

      for (let i = 0; i < 3; i++) {
        const userQuestion = document.createElement("div");
        userQuestion.className = "message you"; // Add 'you' class for user's messages
        userQuestion.textContent = shuffledQuestions[i];
        userQuestion.setAttribute("onclick", `sendMessageFromPredefinedQuestion('${shuffledQuestions[i]}')`);
        chatBody.appendChild(userQuestion);
      }

      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  sendMessage() {
    const chatInput = document.getElementById('chat-input') as HTMLInputElement;
    if (chatInput) {
      const message = chatInput.value.trim();
      if (message) {
        this.sendMessageFromPredefinedQuestion(message);
        chatInput.value = '';
      }
    }
  }
}
