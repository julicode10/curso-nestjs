import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
}

@Controller('users')
export class UsersController {
    private users: User[] = [
        {
            id: 1,
            name: 'John Doe',
            email: 'john.doe@example.com',
            password: '123456',
        },
        {
            id: 2,
            name: 'Jane Doe',
            email: 'jane.doe@example.com',
            password: '123456',
        }
    ];  

    @Get()
    getUsers(): User[] {
        return this.users;
    }

    @Get(':id')
    getUserById(@Param('id') id: string): User {
        const user = this.users.find(user => user.id === parseInt(id));
        if (!user) throw new NotFoundException('User not found');
        return user;
    }
}
