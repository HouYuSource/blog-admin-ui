import request from '@/js/request'

export function page(params) {
  return request({
    url: '/admin/vote/page',
    method: 'get',
    params: params
  })
}


