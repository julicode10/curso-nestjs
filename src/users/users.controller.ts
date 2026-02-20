import { Controller, Get, NotFoundException, Param, Post, Put, Delete, Body } from '@nestjs/common';

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

    @Post()
    createUser(@Body() body: User): User {
        const newUser: User = {
            id: this.users.length + 1,
            name: body.name,
            email: body.email,
            password: body.password,
        };
        this.users.push(newUser);
        return newUser;
    }

    @Delete(':id')
        deleteUser(@Param('id') id: string): { message: string } {
        const user = this.users.find(user => user.id === parseInt(id));
        if (!user) throw new NotFoundException('User not found');
        this.users = this.users.filter(user => user.id !== parseInt(id));
        return { message: 'User deleted successfully' } as const;
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() body: User): User {
        const user = this.users.find(user => user.id === parseInt(id));
        if (!user) throw new NotFoundException('User not found');
        user.name = body.name;
        user.email = body.email;
        user.password = body.password;
        return user;
    }
}
