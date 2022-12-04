import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Profile from '@/contents/profile/Profile';
import { store } from '@/store';

test('should first', async () => {
  // Appコンポーネントを描画
  render(
    <BrowserRouter>
      <Provider store={store}>
        <Profile />
      </Provider>
    </BrowserRouter>
  ); // テキスト「count is」を持っているボタンを検索

  expect(screen.getByRole('button', { name: /変更を確定/i })).toBeInTheDocument();
});
