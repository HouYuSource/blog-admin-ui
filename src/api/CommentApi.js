import request from '@/js/request'

export function page(params) {
  return request({
    url: '/admin/comment/page',
    method: 'get',
    params: params
  })
}

export function updateCommentStatus(params) {
  return request({
    url: '/admin/comment/status',
    method: 'put',
    data: params,
  })
}

export function deleteComment(id) {
  return request({
    url: '/admin/comment/' + id,
    method: 'delete',
  })
}

export function saveComment(params) {
  return request({
    url: '/comment',
    method: 'post',
    data: params,
  })
}

