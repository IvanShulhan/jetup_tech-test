import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addStatistic } from '../../features/words/statisticSlice';
import { selectWords, Words } from '../../features/words/wordsSlice';
import { Header } from '../Header/Header';
import './TestPage.scss';

export const TestPage = () => {
  const [count, setCount] = useState(0);
  const [rightAnswers, setRightAnswers] = useState(0);
  const { words } = useAppSelector(selectWords);

  const dispatch = useAppDispatch();

  const chooseAnswer = (wordId: number, answerId: number) => {
    setCount(count + 1);

    if (wordId === answerId) {
      setRightAnswers(rightAnswers + 1)
    }

    if (count === 9) {
      const date = new Date();
      const localeDate = date.toLocaleDateString('uk-UA');

      dispatch(addStatistic({
        id: date.getTime(),
        created: localeDate ,
        result: rightAnswers * 10
      }))
    }
  }

  const generateMessage = () => {
    switch (true) {
      case rightAnswers === 10:
        return 'Чудовий результат!'
      case rightAnswers >= 7:
        return 'Досить не погано'
      case rightAnswers >= 4:
        return 'Могло б бути краще'
      default:
        return 'Краще ще повчись)'
    }
  }

  const randomSort = (arr: Words[]) => arr.slice().sort(() => Math.random() - 0.5);

  const randomWords = useMemo(() => randomSort(words).slice(0, 10), [words])

  const getRandomAnswers = () => {
    const answers = [randomWords[count]];
    const filteredAnswers = 
      randomWords.filter((answer) => answer.id !== randomWords[count].id);

    return answers.concat(randomSort(filteredAnswers).slice(0, 3));
  };

  return (
  <section className="test-page">
    <Header title="Тест" />
    <div className="test-page__content">
      {words.length >= 10 ? (
        (<div className="test-page__inner">
          {count < 10 ? (
            <>
              <div className="test-page__word">
                {randomWords[count].translations}
              </div>
              <ul className="test-page__variants">
                {getRandomAnswers().map((word) => (
                  <li key={word.id} className="test-page__variant">
                    <button 
                      className="test-page__button"
                      type="button" 
                      onClick={() => {
                        chooseAnswer(word.id, randomWords[count].id)
                      }}
                    >
                      {word.word}
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
          <div className="test-page__result-block">
            <h4 className="test-page__result-title">
              Вітаю!
            </h4>
            <h5 className="test-page__result-subtitle">
              Твій результат
              {' '}
              <span>{rightAnswers * 10}%</span>
            </h5>
            <h5 className="test-page__result-subtitle">
              {generateMessage()}
            </h5>
          </div>
          )}
        </div>)
      ) : (
        <>
          <h3 className="message test-page__message">
            Маловато слів для тесту{')'}
          </h3>
          <h4 className="test-page__message-info">
            {`Ще хоча б ${10 - words.length} ${words.length < 9 ? 'слів' : 'слово'}`}
          </h4>
        </>
        
      )}
    </div>    
    {words.length > 9 && (
    <div className="footer test-page__footer">
      <span className="test-page__count">
        {`Answers: ${count}/10`}
      </span>
    </div>)}
  </section>
)}