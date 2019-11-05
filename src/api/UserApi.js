import request from '@/js/request'

export function page(params) {
  return request({
    url: '/admin/user/page',
    method: 'get',
    params: params
  })
}

export function saveUser(params) {
  return request({
    url: '/admin/user',
    method: 'post',
    data: params,
  })
}

export function updateUser(params) {
  return request({
    url: '/admin/user',
    method: 'put',
    data: params,
  })
}

export function deleteUser(id) {
  return request({
    url: '/admin/user/' + id,
    method: 'delete',
  })
}

export function login(entity) {
  return request({
    url: '/admin/user/login',
    method: 'post',
    data: entity,
  })
}

export function logout() {
  return request({
    url: '/admin/user/logout',
    method: 'delete',
  })
}

export function userDetails() {
  return request({
    url: '/admin/user/details',
    method: 'get',
  })
}

