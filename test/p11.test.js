const request = require('supertest')

describe('Pruebas de modificacion', () => {
  it('Si hacemos una peticion get de list tiene que funcionar', async () => {
    const res = await request('http://localhost:3000')
      .get('/list?user=Dani')
    expect(res.statusCode).toEqual(200)
    expect(JSON.parse(res.text)[0]._id).toEqual('id-1')
  })

  it('Una peticion get de read tiene que funcionar', async () => {
    const res = await request('http://localhost:3000')
      .get('/read?user=Dani&id=1')
    expect(res.statusCode).toEqual(200)
    expect(JSON.parse(res.text)._id).toEqual('id-1')
  })

  it('Tenepos que poder crear un funko con el post', async () => {
    const res = await request('http://localhost:3000')
      .post('/read?user=Dani&id=1')
      .send({_id:"id-12",_name:"batman",_description:"super heroe sin poderes",_type:"Pop!",_genre:"Movies and TV",_franchise:"Bob Kane y Bill Finge",_number:12,_exclusive:false,_specialFeatures:"",_marketValue:33})
    expect(res.statusCode).toEqual(200)
  })
})