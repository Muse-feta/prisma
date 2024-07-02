const express = require('express');
const app = express();
// const path = require('path');
const PORT = 3001;
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();


app.use(express.json());

app.get('/', async (req, res) => {
    const users = await prisma.user.findMany();
    res.send(users);
});
app.post('/', async(req, res) => {
    const user = await prisma.user.create({data: req.body});
    res.send(user);
});
// update a user
app.patch('/:id', async(req, res) => {
    const id = req.params.id;
   try {
      const user = await prisma.user.update({
        where: { Id: Number(id) },
        data: req.body,
      });
      res.send(user);
   } catch (error) {
    console.log(error.message);
   }
});
app.delete('/:id', async(req, res) => {
    const id = req.params.id;
   try {
      const user = await prisma.user.delete({
        where: { Id: Number(id) }
      });
      res.send(user);
   } catch (error) {
    console.log(error.message);
   }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});