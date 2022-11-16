import { shallowMount, Wrapper } from '@vue/test-utils'
import TableComponent from '@/components/TableComponent.vue'
import db from '../../db.json'
import { ref } from 'vue'
import stach from '@/stach-sdk/stach'

describe('TableComponent.vue', () => {
  type IRow = stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow[] | null | undefined;
  const table = ref<IRow>()
  let wrapper: Wrapper<Vue>

  beforeEach(() => {
    const pkg =
      stach.factset.protobuf.stach.v2.RowOrganizedPackage.create(db.data as unknown as stach.factset.protobuf.stach.v2.RowOrganizedPackage)
    table.value = pkg.tables.main.data?.rows

    wrapper = shallowMount(TableComponent, {
      propsData: { table }
    })
  })

  it('renders table component', () => {
    expect(wrapper.text()).toContain('My Tabular Data')
  })
  it('check all tr tags', () => {
    expect(wrapper.findAll('tr').length).toEqual(18)
  })
  it('check all td tags', () => {
    expect(wrapper.findAll('td').length).toEqual(133)
  })
  it('check class header ', () => {
    expect(wrapper.find('.header').exists()).toBe(true)
  })
  it('check table exist ', () => {
    expect(wrapper.find('table').exists()).toBe(true)
  })
  it('check td has rowspan attribute 3 ', () => {
    expect(wrapper.find('td').attributes('rowspan')).toBe('3')
  })
  it('check table exist ', () => {
    expect(wrapper.find('table').exists()).toBe(true)
  })
  it('check td is td ', () => {
    expect(wrapper.findAll('td').at(2).exists()).toBe(true)
  })
})
