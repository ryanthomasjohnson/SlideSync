import React from 'react';
import { Grid,Sidebar,Modal,Form,Button } from 'semantic-ui-react';

import SlidesContainer from '../Slides/SlidesContainer';
import Editor from '../Editor/Editor';
import Chat from '../Chat/Chat';
import LectureQuiz from './LectureQuiz';
import firebase from '../../firebase';
import LectureMenu from './LectureMenu';

export default class LectureContainer extends React.Component {

  constructor(props) {
    super(props);


    const id = this.props.match.params.id;
    const db = firebase.firestore();
    this.docRef = db.collection('slides').doc(id);


    this.state = {
      quiz: {
        quizVisible: false,
        question: 'What is the best letter???',
        answers: ['a', 'b', 'c'],
        selectedAnswer: null,
      },
      isOpen: null,
      createQuiz: false,
      visible: false,
    };
  }

  handleButtonClick = () => this.setState({ visible: !this.state.visible })
  handleSidebarHide = () => this.setState({ visible: false })

  componentWillMount() {
    this.docRef.onSnapshot((document) => {
      const { quiz } = this.state;
      quiz.question = document.get('question');
      quiz.answers = document.get('answer');
      this.setState({ isOpen: document.get('quiz_on'), quiz });
    });
  }

  handleQuizChange = (item) => {
    const { quiz } = this.state;
    quiz.selectedAnswer = item;
    this.setState({
      quiz,
    });
  }

  handleClose = () => this.setState({ isOpen: false })

  openCreateForm = () => this.setState({createQuiz:true})

  createForm = () => {
    this.docRef.set({ question: 'who?', answer: ['1', '2', '3'] }, { merge: true }).catch((error) => {
      console.log(error); // eslint-disable-line no-console
    });
    this.setState({createQuiz:false})
  }

  render() {
    const { match } = this.props;
    const { quiz, isOpen, createQuiz,visible } = this.state;



    return (
      <div className="LectureContainer" style={{ backgroundColor: 'MintCream' }}>

        <Button onClick={() => {this.openCreateForm()}}>
          Create Quiz
        </Button>

        <Modal open={createQuiz}>
          <Modal.Header>Create a new quiz</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Form>
                <Form.Input fluid label="Question" placeholder="Enter your Question Here" />
                <Form.Input fluid label="Answer" placeholder="Enter an Answer choice for your question here" />
                <Form.Input fluid label="Answer2" placeholder="Enter an Answer choice for your question here" />
                <Form.Input fluid label="Answer3" placeholder="Enter an Answer choice for your question here" />
                <Form.Input fluid label="Answer4" placeholder="Enter an Answer choice for your question here" />
              </Form>
            </Modal.Description>
          </Modal.Content>
          <Modal.Actions>
            <Button onClick={() => {this.createForm()}}>
              Submit
            </Button>
          </Modal.Actions>
        </Modal>

        <LectureMenu />
        <Sidebar.Pushable>
          <Sidebar
            animation="overlay"
            icon="labeled"
            onHide={this.handleSidebarHide}
            visible={visible}
            width="wide"
            style={{ backgroundColor: 'MintCream' }}
          >
            <div id="userlist" />
          </Sidebar>
          <Sidebar.Pusher>
            <Grid columns={2} padded>
              <Grid.Row>

                <LectureQuiz quiz={quiz} handleChange={this.handleQuizChange} open={isOpen} handleClose={this.handleClose}/>
                <Grid.Column>
                  <div ref={this.getWidth}>
                    <SlidesContainer id={match.params.id} />
                  </div>
                  <Chat id={match.params.id} />
                </Grid.Column>
                <Grid.Column>
                  <Editor id={match.params.id} showUsers={this.handleButtonClick} />
                </Grid.Column>
              </Grid.Row>
            </Grid>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </div>);
  }
}
// LectureContainer.propTypes = {
//   match: PropTypes.match({ title: PropTypes.string });
// }
