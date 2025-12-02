import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';
import { CreateUserInput } from './dto/create-user.input';

@Injectable()
export class UsersService {
  private readonly SALT_ROUNDS = 12;

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userModel.find().exec();
    return users;
  }

  async findById(id: string): Promise<User | null> {
    try {
      const user = await this.userModel.findById(id).exec();
      return user;
    } catch (error) {
      return null;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userModel
      .findOne({ email: email.toLowerCase() })
      .exec();
    
    return user;
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    const emailExists = await this.checkEmailExists(createUserInput.email);
    
    if (emailExists) {
      throw new BadRequestException('User with this email already exists');
    }

    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(createUserInput.password, salt);

    const newUser = await this.userModel.create({
      fullName: createUserInput.fullName,
      email: createUserInput.email.toLowerCase(),
      password: hashedPassword,
      role: createUserInput.role || 'VIEWER',
    });

    return newUser;
  }

  async delete(userId: string): Promise<void> {
    const result = await this.userModel.findByIdAndDelete(userId).exec();
    
    if (!result) {
      throw new NotFoundException('User not found');
    }
  }

  private async checkEmailExists(email: string): Promise<boolean> {
    const count = await this.userModel
      .countDocuments({ email: email.toLowerCase() })
      .exec();
    
    return count > 0;
  }
}