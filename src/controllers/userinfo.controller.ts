import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getModelSchemaRef,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Userinfo} from '../models';
import {UserinfoRepository} from '../repositories';

export class UserinfoController {
  constructor(
    @repository(UserinfoRepository)
    public userinfoRepository : UserinfoRepository,
  ) {}

  @post('/userinfos', {
    responses: {
      '200': {
        description: 'Userinfo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Userinfo)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userinfo, {exclude: ['id']}),
        },
      },
    })
    userinfo: Omit<Userinfo, 'id'>,
  ): Promise<Userinfo> {
    return this.userinfoRepository.create(userinfo);
  }

  @get('/userinfos/count', {
    responses: {
      '200': {
        description: 'Userinfo model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Userinfo)) where?: Where<Userinfo>,
  ): Promise<Count> {
    return this.userinfoRepository.count(where);
  }

  @get('/userinfos', {
    responses: {
      '200': {
        description: 'Array of Userinfo model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Userinfo)},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Userinfo)) filter?: Filter<Userinfo>,
  ): Promise<Userinfo[]> {
    return this.userinfoRepository.find(filter);
  }

  @patch('/userinfos', {
    responses: {
      '200': {
        description: 'Userinfo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userinfo, {partial: true}),
        },
      },
    })
    userinfo: Userinfo,
    @param.query.object('where', getWhereSchemaFor(Userinfo)) where?: Where<Userinfo>,
  ): Promise<Count> {
    return this.userinfoRepository.updateAll(userinfo, where);
  }

  @get('/userinfos/{id}', {
    responses: {
      '200': {
        description: 'Userinfo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Userinfo)}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Userinfo> {
    return this.userinfoRepository.findById(id);
  }

  @patch('/userinfos/{id}', {
    responses: {
      '204': {
        description: 'Userinfo PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Userinfo, {partial: true}),
        },
      },
    })
    userinfo: Userinfo,
  ): Promise<void> {
    await this.userinfoRepository.updateById(id, userinfo);
  }

  @put('/userinfos/{id}', {
    responses: {
      '204': {
        description: 'Userinfo PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() userinfo: Userinfo,
  ): Promise<void> {
    await this.userinfoRepository.replaceById(id, userinfo);
  }

  @del('/userinfos/{id}', {
    responses: {
      '204': {
        description: 'Userinfo DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.userinfoRepository.deleteById(id);
  }
}
