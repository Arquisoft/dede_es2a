import '@testing-library/jest-dom/extend-expect';
import {fireEvent, render} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginButton from '../componentes/Login/LoginButton';
import LogoutButton from '../componentes/Login/LogoutButton'

test('login button is rendered', () => {
  const component = render(<LoginButton/>)

  expect(component.container).toHaveTextContent('Registrarse')
})

test('clicking login button', () => {
  const component = render(<LoginButton/>)

  const mockHandler = jest.fn()

  const button = component.getByText('Registrarse')
  fireEvent.click(button)
  
  expect(mockHandler).toHaveBeenCalledTimes(1)
})

test('logout button is rendered', () => {
  const component = render(<LogoutButton/>)
  
  expect(component.container).toHaveTextContent('Desconectarse')
})

test('clicking logout button', () => {
  const component = render(<LogoutButton/>)

  const mockHandler = jest.fn()

  const button = component.getByText('Desconectarse')
  fireEvent.click(button)
  
  expect(mockHandler).toHaveBeenCalledTimes(1)
}) 
