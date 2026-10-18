import { emit } from './env';
import { profile } from '../data';

/** Little rewards for curious visitors: a console note, and "hire" typed anywhere starts a meteor shower. */
export const installEasterEggs = () => {
  console.log(
    '%c✦ Đọc source à? Mình hợp nhau đấy — ' + profile.email,
    'font: 500 14px "Be Vietnam Pro", sans-serif; color: #B9A6FF; background: #07040F; padding: 10px 14px; border-radius: 8px;'
  );
  console.log('%cPS: thử gõ chữ "hire" trên trang xem.', 'color: #B7AECB; font-style: italic;');

  const word = 'hire';
  let typed = '';
  const onKey = (e: KeyboardEvent) => {
    const target = e.target as HTMLElement;
    if (target.closest('input, textarea, [contenteditable="true"]') || e.key.length !== 1) return;
    typed = (typed + e.key.toLowerCase()).slice(-word.length);
    if (typed === word) {
      typed = '';
      emit('meteors');
    }
  };
  window.addEventListener('keydown', onKey);
  return () => window.removeEventListener('keydown', onKey);
};
