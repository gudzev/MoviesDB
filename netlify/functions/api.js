const token = process.env.API_KEY;
console.log(token);

const options = 
{
  method: 'GET',
  headers: 
  {
    accept: 'application/json',
    Authorization: `Bearer ${token}`,
  },
};

module.exports = { options };
