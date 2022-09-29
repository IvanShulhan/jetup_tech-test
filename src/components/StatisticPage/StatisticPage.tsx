import { useAppSelector } from '../../app/hooks'
import { selectStatistic } from '../../features/words/statisticSlice'
import { Header } from '../Header/Header';
import './StatisticPage.scss';

export const StatisticPage = () => {
  const { statistic } = useAppSelector(selectStatistic);
  const avaregeResult = statistic.reduce((acc, stat) => (
    acc + stat.result
  ), 0) / statistic.length;

  return (
    <div className="statistic-page">
      <Header title="Статистика" />
      <div className="statistic-page__content">
        {statistic.length ? (
          <>
            <h2 className="statistic-page__title">
              {`Твій середній результат ${avaregeResult}%`}
            </h2>
            <h3 className="statistic-page__subtitle">
              Твої результати:
            </h3>
            <ul className="statistic-page__list">
              {statistic.map((item) => (
                <li key={item.id} className="statistic-page__list-item">
                  <span className="statistic-page__list-item-element">
                    {item.created}
                  </span>
                  <span className="statistic-page__list-item-element">
                    {item.result}%
                  </span>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <h3 className="message statistic-page__message">
            В тебе поки що немає результатів
          </h3>
          )}
        
      </div>
      <div className="statistic-page__footer" />
    </div>
  )
}