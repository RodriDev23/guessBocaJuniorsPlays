import { useState } from 'react';
import QUESTIONS from './QUESTIONS.json';

function App() {
  const [indexes, setIndexes] = useState({ questionIndex: 0, videoIndex: 0 });
  const [status, setStatus] = useState<'initial' | 'playing' >('initial');
  const [lifes , setLifes] = useState(3);
  const [correctAnswers, setCorrectAnswers] = useState(0); 

  const { questionIndex} = indexes;
  const question = QUESTIONS.questions[questionIndex];
  const { answers, video } = question || {};
 

  

 

  function handleIndex(answerIndex: number ) {
    const nextQuestionIndex = questionIndex + 1;
    const isCorrect = answers?.[answerIndex]?.isCorrect;
    if(isCorrect === true) {
    setIndexes({ questionIndex: nextQuestionIndex, videoIndex: answerIndex });
    setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1)
    } else {
      setLifes((prevLifes) => prevLifes - 1);
    }  
    console.log('Correct Answers:', correctAnswers);
  }

  return (
    <main className="container bg-yellow-500 m-3 p-3 flex flex-col items-center justify-center w-screen h-screen">
      
    {
      status === 'initial' && (
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-4xl sm:text-5xl text-blue-950 font-bold mb-10">Trivia Boca</h1>
          <div className='flex flex-col justify-center items-center text-2xl text-center gap-10 font-bold text-blue-950'>
          <p>Bienvenido a la trivia de Boca tendras que adivinar cual es el gol correcto </p>
          <img src="https://media.tenor.com/ZIAeaUZzBNEAAAAd/juan-rom%C3%A1n-riquelme-mate.gif" alt="" />
          <p>Son 5 videos y tenes 3 vidas</p>
          </div>
          <button onClick={() => {setStatus('playing'), 
                                  setCorrectAnswers(0), 
                                  setLifes(3) }} 
          
          className='mt-20 bg-blue-950 text-yellow-50 font-bold py-3 px-10 rounded-lg shadow-lg hover:bg-yellow-50 hover:text-blue-950 hover:border-blue-950 hover:shadow-md transition-all duration-300'>Jugar</button>
        </div>
      )
    }    
        
        
        
        
       
   {status === 'playing' && lifes > 0 && correctAnswers < 5 && (
   <div className="flex flex-col justify-center items-center">
    <h1 className="text-4xl sm:text-5xl text-blue-950 font-bold mb-10">Trivia Boca</h1>
    <h2 className='text-3xl sm:text-2xl text-blue-950 font-bold mb-1'>Tenes : {lifes} vidas</h2>
    <div className="w-full max-w-screen-lg">
      <div className="mt-4 w-full justify-center flex flex-col items-center">
        {video && (
          <video src={video} controls autoPlay playsInline loop width="450" height="360" /> as React.ReactElement<HTMLVideoElement>
        )}
        {answers &&
          answers.map((answer, answerIndex) => (
            <div className="w-[40vh]" key={answer.text}>
              <button
                onClick={() => handleIndex(answerIndex)}
                className="block w-full text-center text-3xl py-6 px-8 rounded-lg shadow-lg font-bold bg-blue-900 text-yellow-50 mt-6 hover:bg-yellow-50 hover:text-blue-900 hover:border-blue-900 hover:shadow-md transition-all duration-300"
              >
                {answer.text}
              </button>
            </div>
          ))}
      </div>
    </div>
  </div>
)}




{ status !== 'initial' && correctAnswers === 5 && (
  <div className="flex flex-col justify-center items-center text-4xl text-center gap-10 font-bold text-blue-950">
    <p>Sos un Verdadero Hincha de Boca</p>
    <img src="https://media.tenor.com/ZHsIBXzjl-cAAAAd/diego-armando.gif" alt="diego-gif" />
    <p>Felicidades Flaco/a</p>
    <button
      onClick={() => {
        setStatus('initial'),
        setLifes(5),
        setCorrectAnswers(0)
        setIndexes({ questionIndex: 0, videoIndex: 0 });
      }}
      className="mt-20 bg-blue-950 text-yellow-50 font-bold py-3 px-10 rounded-lg shadow-lg hover:bg-yellow-50 hover:text-blue-950 hover:border-blue-950 hover:shadow-md transition-all duration-300"
    >
      Volver a jugar
    </button>
  </div>
)}




{status !== 'initial' && lifes === 0 && (
  <div className='flex flex-col justify-center items-center text-4xl text-center gap-10 font-bold text-blue-950'>
    <p>Mamita no sos un verdadero hincha de Boca</p>
    <img src="https://media.tenor.com/X-dKe_YMkdMAAAAd/llorando-boca-juniors.gif" alt="patada" />
    <p>Practica Mas </p>
    <button
       onClick={() => {setStatus('initial') , 
                       setLifes(5), 
                       setCorrectAnswers(0)
                       
                      }}

      className='mt-20 bg-blue-950 text-yellow-50 font-bold py-3 px-10 rounded-lg shadow-lg hover:bg-yellow-50 hover:text-blue-950 hover:border-blue-950 hover:shadow-md transition-all duration-300'
    >
      Jugar de nuevo
    </button>
  </div>
)}


    </main>
  );
}

export default App;
