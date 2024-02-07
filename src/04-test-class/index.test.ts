import { jest } from '@jest/globals';
import { random } from 'lodash';
import {
	getBankAccount,
	InsufficientFundsError,
	TransferFailedError,
	SynchronizationFailedError,
} from '.';

jest.mock('lodash');

describe('BankAccount', () => {
	const mockedRandom = jest.mocked(random);

	test('should create account with initial balance', () => {
		const initialBalance = 1000;
		const bankAccount = getBankAccount(initialBalance);
		expect(bankAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
		const initialBalance = 1000;
		const bankAccount = getBankAccount(initialBalance);
		expect(() => bankAccount.withdraw(initialBalance + 1)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
		const initialBalance = 1000;
		const bankAccount1 = getBankAccount(initialBalance);
		const bankAccount2 = getBankAccount(initialBalance);
		expect(() => bankAccount1.transfer(initialBalance + 1, bankAccount2)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
		const initialBalance = 1000;
		const bankAccount = getBankAccount(initialBalance);
		expect(() => bankAccount.transfer(initialBalance, bankAccount)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const initialBalance = 0;
		const bankAccount = getBankAccount(initialBalance);
		const money = 100;
		bankAccount.deposit(money);
		expect(bankAccount.getBalance()).toBe(money);
  });

  test('should withdraw money', () => {
		const initialBalance = 1000;
		const bankAccount = getBankAccount(initialBalance);
		const money = 100;
		bankAccount.withdraw(money);
		expect(bankAccount.getBalance()).toBe(initialBalance - money);
  });

  test('should transfer money', () => {
		const initialBalance = 1000;
		const bankAccount1 = getBankAccount(initialBalance);
		const bankAccount2 = getBankAccount(initialBalance);
		const money = 100;
		bankAccount1.transfer(money, bankAccount2);
		expect(bankAccount1.getBalance()).toBe(initialBalance - money);
		expect(bankAccount2.getBalance()).toBe(initialBalance + money);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
		const initialBalance = 1000;
		const bankAccount = getBankAccount(initialBalance);
		const money = 100;
		mockedRandom
			.mockReturnValueOnce(money)
			.mockReturnValueOnce(1);
		await expect(bankAccount.fetchBalance()).resolves.toBe(money);
  });

  test('should set new balance if fetchBalance returned number', async () => {
		const initialBalance = 1000;
		const bankAccount = getBankAccount(initialBalance);
		const money = 100;
		mockedRandom
			.mockReturnValueOnce(money)
			.mockReturnValueOnce(1);
		await bankAccount.synchronizeBalance();
		expect(bankAccount.getBalance()).toBe(money);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
		const initialBalance = 1000;
		const bankAccount = getBankAccount(initialBalance);
		const money = 100;
		mockedRandom
			.mockReturnValueOnce(money)
			.mockReturnValueOnce(0);
		await expect(bankAccount.synchronizeBalance()).rejects.toThrow(SynchronizationFailedError);
  });
});
