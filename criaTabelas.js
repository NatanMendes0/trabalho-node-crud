const database = require('./config/db');
const Categoria = require('./model/categoria');
const Jogo = require('./model/jogo');
const Usuario = require('./model/usuario');

const bcrypt = require('bcryptjs');
const saltRounds = 10;

Usuario.sync({force: true});

database.sync ({force: true}).then( result => {
    Categoria.create({
        nome: 'FPS',
    });
    Categoria.create({
        nome: 'RPG',
    });
    Categoria.create({
        nome: 'Esporte',
    });
    Categoria.create({
        nome: 'Corrida',
    });
    Categoria.create({
        nome: 'Luta',
    });
    Categoria.create({
        nome: 'Terror',
    });
    Categoria.create({
        nome: 'Ação e Aventura',
    });

    Jogo.create({
        nome: 'Call of Duty: Modern Warfare',
        descricao: 'Call of Duty: Modern Warfare é um jogo eletrônico de tiro em primeira pessoa desenvolvido pela Infinity Ward e publicado pela Activision. Lançado em 25 de outubro de 2019 para Microsoft Windows, PlayStation 4 e Xbox One.',
        preco: 200,
        imagem: 'Call-of-Duty-Modern-Warfare.jpg',
        categoriaId: 1,
    });
    Jogo.create({
        nome: 'Call of Duty: Black Ops II',
        descricao: 'Call of Duty: Black Ops II é um jogo eletrônico de tiro em primeira pessoa desenvolvido pela Treyarch e publicado pela Activision. Lançado em 13 de novembro de 2012 para Microsoft Windows, PlayStation 3, Xbox 360, Wii U e Nintendo DS.',
        preco: 150,
        imagem: 'Call-of-Duty-Black-Ops-II.jpg',
        categoriaId: 1,
    });
    Jogo.create({
        nome: 'Dark Souls Remastered',
        descricao: 'Dark Souls Remastered é um jogo eletrônico de ação e RPG desenvolvido pela FromSoftware e publicado pela Bandai Namco Entertainment. É uma remasterização do jogo Dark Souls lançado em 2011 para PlayStation 3, Xbox 360 e Microsoft Windows.',
        preco: 250,
        imagem: 'Dark-Souls-Remastered.webp',
        categoriaId: 2,
    });
    Jogo.create({
        nome: 'Hollow Knight',
        descricao: 'Hollow Knight é um jogo eletrônico de ação e aventura desenvolvido pela Team Cherry e publicado pela Team Cherry. É um jogo de plataforma 2D em estilo metroidvania, com elementos de RPG e roguelike.',
        preco: 50,
        imagem: 'Hollow-Knight.jpg',
        categoriaId: 2,
    });
    Jogo.create({
        nome: 'FIFA 20',
        descricao: 'FIFA 20 é um jogo eletrônico de futebol desenvolvido pela EA Vancouver e publicado pela EA Sports. É o 27º jogo da série FIFA e foi lançado em 27 de setembro de 2019 para PlayStation 4, Xbox One, Nintendo Switch e Microsoft Windows.',
        preco: 200,
        imagem: 'FIFA-20.jpg',
        categoriaId: 3,
    });
    Jogo.create({
        nome: 'Rocket League',
        descricao: 'Rocket League é um jogo eletrônico de futebol desenvolvido e publicado pela Psyonix. É um jogo de esporte de veículos que combina futebol com veículos de alta velocidade.',
        preco: 100,
        imagem: 'Rocket-League.jpg',
        categoriaId: 3,
    });

    Usuario.create({
        nome: 'Admin',
        email: 'admin@gmail.com',
        senha: bcrypt.hashSync('12345', saltRounds),
    });
    Usuario.create({
        nome: 'natan',
        email: 'natan@gmail.com',
        senha: bcrypt.hashSync('12345', saltRounds),
    });
    Usuario.create({
        nome: 'bruno',
        email: 'bruno@gmail.com',
        senha: bcrypt.hashSync('12345', saltRounds),
    });
    Usuario.create({
        nome: 'lucas',
        email: 'lucas@gmail.com',
        senha: bcrypt.hashSync('12345', saltRounds),
    });
});