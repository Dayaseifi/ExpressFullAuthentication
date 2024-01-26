const { signUp } = require('../controller/authcontroller'); // Replace with the correct path to your signup module
const {
  IsUserExistByEmail,
  UserCreate
} = require('../app/user.app'); 

const contentValidation = require('../utils/contentValidation');

jest.mock('../app/user.app.js');
jest.mock("../utils/contentValidation")

describe('signUp function', () => {
  test('should return a validation error if input is invalid', async () => {
    const req = {
      body: {
        Email: 'Dayaseifi10@gmail.com',
        Password: 'Dayaseifi',
        UserName : "dayaseifi"
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    contentValidation.TotalValidator.mockReturnValue('Validation error');

    await signUp(req, res, next);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      data: null,
      error: {
        message: 'Validation error',
      },
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('should return an error if user already exists', async () => {
    const req = {
      body: {
        Email: 'existing-email@example.com',
        Password: 'password123',
        Username: 'existinguser',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    contentValidation.TotalValidator.mockReturnValue(null);
    IsUserExistByEmail.mockResolvedValue(true);

    await signUp(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
        success: false,
        data: null,
        error: {
            message: "user exist already"
        }
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('should create a new user successfully', async () => {
    const req = {
      body: {
        Email: 'new-email@example.com',
        Password: 'newpassword123',
        Username: 'newuser',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    contentValidation.TotalValidator.mockReturnValue(null);
    IsUserExistByEmail.mockResolvedValue(false);
    UserCreate.mockResolvedValue('User created successfully');

    await signUp(req, res, next);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: {
        message: 'User created successfully',
      },
      error: null,
    });
    expect(next).not.toHaveBeenCalled();
  });

  test('should call next with an error if an exception occurs', async () => {
    const req = {
      body: {
        Email: 'valid-email@example.com',
        Password: 'password123',
        Username: 'validuser',
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    contentValidation.TotalValidator.mockReturnValue(null);
    IsUserExistByEmail.mockRejectedValue(new Error('Some error occurred'));

    await signUp(req, res, next);

    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(new Error('Some error occurred'));
  });
});
