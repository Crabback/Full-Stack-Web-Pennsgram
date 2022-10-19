import UserPage from "../pages/UserPage/User";
import renderer from 'react-test-renderer';
import { render } from '@testing-library/react'

it('creates post', () => {
    const { getByTestId } = render(<UserPage></UserPage>)
    expect(getByTestId('username').toHaveTextContent("Username"))
});

