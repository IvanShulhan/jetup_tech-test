import classNames from 'classnames';
import { useState } from 'react';
import { useAppDispatch } from '../../app/hooks';
import { addWords } from '../../features/words/wordsSlice';
import { Header } from '../Header/Header';
import './AddWord.scss';

const cyrillicRegex = /^[а-яієїґА-ЯІЄЇҐ"][а-яієїґА-ЯІЄЇҐ\s-]*$/;
const latinRegex = /^[a-zA-Z][a-zA-Z\s-]*$/;
const clearFormData = {
  ukr: '',
  eng: '',
}

export const AddWord = () => {
  const [formData, setFormData] = useState(clearFormData);
  const [isValidCyrillic, setIsValidCyrillic] = useState(true);
  const [isValidLatin, setIsValidLatin] = useState(true);
  const [isVisibleSuccesMassage, setIsVisibleSuccesMassage] = useState(false);

  const changeIsVisibleSuccesMassage = () => {
    setIsVisibleSuccesMassage(true);

    setTimeout(() => {
      setIsVisibleSuccesMassage(false);
    }, 2000);
  }

  const dispatch = useAppDispatch();

  const checkIsValidCyrillic = () => cyrillicRegex.test(formData.ukr.trim());
  const checkIsValidLatin = () => latinRegex.test(formData.eng.trim());

  const changeFormData = (target: EventTarget & HTMLInputElement, key: string) => {
      setFormData((curr) => ({
        ...curr,
        [key]: target.value,
      }))
  };

  const submitAddWord = () => {
    setIsValidCyrillic(checkIsValidCyrillic());
    setIsValidLatin(checkIsValidLatin());

    if (checkIsValidCyrillic() && checkIsValidLatin()) {
      const id = Date.now();

      dispatch(addWords({
        id,
        word: formData.ukr.trim(),
        translations: formData.eng.trim()
      }))

      setFormData(clearFormData);
      changeIsVisibleSuccesMassage();
    }
  }

  return (
    <section className="add-word app__add-word">
      {isVisibleSuccesMassage && (
        <h3 className="add-word__succes-message">
          Збережено
        </h3>
      )}
      <Header title="Додати слово" />
      <form className="form add-word__form">
        <div className="form__inputs-block">
          <label className="form__label">
            <h3 className="form__label-title">
              Українською
            </h3>
            <input
              className={classNames(
                'form__input', 
                {'form__input--with-error': !isValidCyrillic}
              )}
              type="text" 
              placeholder="Введіть слово українською"
              value={formData.ukr}
              onFocus={() => {
                setIsValidCyrillic(true)
              }}
              onChange={({ target }) => {
                changeFormData(target, 'ukr');
              }}
            />
            {!isValidCyrillic && (
              <span className="form__input-warning">
                {formData.ukr.length ? 'Лише кириличні букви!' : 'Будь ласка заповніть поле'}
              </span>
            )}
          </label>
          <label className="form__label">
            <h3 className="form__label-title">
              English
            </h3>
            <input 
              className={classNames(
                'form__input', 
                {'form__input--with-error': !isValidLatin}
              )} 
              type="text" 
              placeholder="Enter the word in English"
              value={formData.eng}
              onFocus={() => {
                setIsValidLatin(true);
              }}
              onChange={({ target }) => {
                changeFormData(target, 'eng');
              }}
            />
            {!isValidLatin && (
              <span className="form__input-warning">
                {formData.eng.length ? 'Only latin letters!' : 'Please fill the field'}
              </span>
            )}
          </label>
        </div>
        <div className="footer form__footer">
          <button 
            type="button" 
            className="button form__button"
            onClick={submitAddWord}
          >
            Зберегти
          </button>
        </div>
      </form>
    </section>
    
  )
}