module.exports = (req, res, next) => {
  if (req.method === 'POST' && req.path === '/login') {
    if (req.body.username === '123' && req.body.password === '321') {
      return res.status(200).json({
        user: {
          token: '111'
        }
      })
    } else {
      return res.status(400).json({ message: '用户名或者密码错误' })
    }
  }
  next()
}
