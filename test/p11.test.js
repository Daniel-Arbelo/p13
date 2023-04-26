const request = require('supertest')

describe('Pruebas de modificacion', () => {
  it('Si hacemos una peticion get de list tiene que funcionar', async () => {
    const res = await request('http://localhost:3000')
      .get('/list?user=Dani')
    expect(res.statusCode).toEqual(200)
    expect(JSON.parse(res.text)[0]._myid).toEqual('id-12')
  })

  it('Una peticion get de read tiene que funcionar', async () => {
    const res = await request('http://localhost:3000')
      .get('/read?user=Dani&id=12')
    expect(res.statusCode).toEqual(200)
    expect(JSON.parse(res.text)[0]._myid).toEqual('id-12')
  })

  it('Tenepos que poder añadir un funko con el post', async () => {
    const res = await request('http://localhost:3000')
      .post('/add?user=Dani')
      .send({_myid:"id-13",_name:"Jocker",_description:"anti heroe sin poderes",_type:"Pop!",_genre:"Movies and TV",_franchise:"Bob Kane y Bill Finge",_number:10,_exclusive:false,_specialFeatures:"",_marketValue:50})
    expect(res.statusCode).toEqual(200)
  })

  it('Tenepos que poder modificar un funko con el patch', async () => {
    const res = await request('http://localhost:3000')
      .patch('/update?user=Dani')
      .send({_myid:"id-13",_name:"modificado",_description:"anti heroe sin poderes",_type:"Pop!",_genre:"Movies and TV",_franchise:"Bob Kane y Bill Finge",_number:10,_exclusive:false,_specialFeatures:"",_marketValue:50})
    expect(res.statusCode).toEqual(200)
  })

  it('Una peticion get de read tiene que funcionar', async () => {
    const res = await request('http://localhost:3000')
      .get('/read?user=Dani&id=13')
    expect(res.statusCode).toEqual(200)
    expect(JSON.parse(res.text)[0]._name).toEqual('modificado')
  })

  it('Si hacemos una peticion get de list tiene que funcionar', async () => {
    const res = await request('http://localhost:3000')
      .get('/list?user=Dani')
    expect(res.statusCode).toEqual(200)
    expect(JSON.parse(res.text).length).toEqual(2)
  })

  it('Tenepos que poder eliminar un funko con el del', async () => {
    const res = await request('http://localhost:3000')
      .del('/remove?user=Dani&id=13')
    expect(res.statusCode).toEqual(200)
  })

  it('Si hacemos una peticion get de list tiene que funcionar', async () => {
    const res = await request('http://localhost:3000')
      .get('/list?user=Dani')
    expect(res.statusCode).toEqual(200)
    expect(JSON.parse(res.text).length).toEqual(1)
  })
  
})