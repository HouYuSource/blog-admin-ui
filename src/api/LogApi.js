import request from '@/js/request'

export function page(params) {
  return request({
    url: '/admin/log/page',
    method: 'get',
    params: params
  })
}

export function deleteWeekBefore() {
  return request({
    url: '/admin/log/delete/week/before',
    method: 'get',
  })
}


