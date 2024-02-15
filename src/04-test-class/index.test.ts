// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 1000;
    const account = getBankAccount(initialBalance);
    expect(account.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(500);
    expect(() => account.withdraw(600)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const accountFrom = getBankAccount(500);
    const accountTo = getBankAccount(0);
    expect(() => accountFrom.transfer(600, accountTo)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(1000);
    expect(() => account.transfer(100, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(500);
    account.deposit(200);
    expect(account.getBalance()).toBe(700);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(1000);
    account.withdraw(200);
    expect(account.getBalance()).toBe(800);
  });

  test('should transfer money', () => {
    const accountFrom = getBankAccount(1000);
    const accountTo = getBankAccount(200);
    accountFrom.transfer(300, accountTo);
    expect(accountFrom.getBalance()).toBe(700);
    expect(accountTo.getBalance()).toBe(500);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const account = getBankAccount(0);
    const balance = await account.fetchBalance();
    expect(balance).toBeGreaterThanOrEqual(0);
    expect(balance).toBeLessThanOrEqual(100);
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(0);
    await account.synchronizeBalance();
    expect(account.getBalance()).toBeGreaterThanOrEqual(0);
    expect(account.getBalance()).toBeLessThanOrEqual(100);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);
    jest.spyOn(account, 'fetchBalance').mockResolvedValue(null);
    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
