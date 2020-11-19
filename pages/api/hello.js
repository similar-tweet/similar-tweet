// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  console.log('hello!')
  console.log(req, res);
  res.statusCode = 200
  res.json({ name: 'John Doe' })

  return res;
}
