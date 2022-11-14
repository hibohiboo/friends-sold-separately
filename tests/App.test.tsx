import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import App from '@/App';
import { store } from '@/store';

test('should first', async () => {
  // Appコンポーネントを描画
  render(
    <Provider store={store}>
      <App />
    </Provider>
  ); // テキスト「count is」を持っているボタンを検索

  expect(screen.getByRole('button', { name: /変更を確定/i })).toBeInTheDocument();
});
