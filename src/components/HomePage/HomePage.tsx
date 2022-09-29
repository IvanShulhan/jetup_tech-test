import { selectWords } from '../../features/words/wordsSlice';
import { useAppSelector } from '../../app/hooks';
import { Link } from 'react-router-dom';
import { Header } from '../Header/Header';
import './HomePage.scss';

export const HomePage = () => {
  const { words } = useAppSelector(selectWords);
  const count = words.length;

  return (
    <div className="home-page">
      <Header title="Твої слова" content={`загалом: ${count}`} />
      <ul className="home-page__words-list">
        {words.length ? (words.map((word) => (
          <li className="home-page__words-item" key={word.id}>
            <span className="home-page__word">{word.word}</span>
            <span className="home-page__word">{word.translation}</span>
          </li>
        ))) : (
            <h3 className="message home-page__message">
              У тебе немає збережених слів!
            </h3>
          )}
      </ul>
      {words.length > 6 && <span className="home-page__arrow" />}
      <nav className="footer home-page__footer">
          <ul className="home-page__links-list">
            <li className="home-page__links-item">
              <Link to='/add-word' className="button home-page__button">
                Додати слово
              </Link>
            </li>
            <li className="home-page__links-item">
              <Link to='/test' className="button home-page__button">
                Тест
              </Link>
            </li>
            <li className="home-page__links-item">
              <Link to='/statistic' className="button home-page__button">
                Статистика
              </Link>
            </li>
          </ul>
        </nav>
    </div>
  )
}