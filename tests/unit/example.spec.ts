import { shallowMount, Wrapper } from '@vue/test-utils'
import TableComponent from '@/components/TableComponent.vue'
import db from '../../db.json'
import { ref } from 'vue'
import stach from '@/stach-sdk/stach'
import {
  isHeader,
  rowspan,
  colspan,
  alignment,
  groupLevel
} from '@/components/features/features'

describe('TableComponent.vue', () => {
  type IRow = stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow[] | null | undefined;
  const table = ref<IRow>()
  let wrapper: Wrapper<Vue>

  beforeEach(() => {
    const pkg =
      stach.factset.protobuf.stach.v2.RowOrganizedPackage.create(db.data as unknown as stach.factset.protobuf.stach.v2.RowOrganizedPackage)
    table.value = pkg.tables.main.data?.rows

    wrapper = shallowMount(TableComponent as any, {
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
  it('renders searchbar', () => {
    expect(wrapper.text()).toContain('Search')
  })
  it('check td count when Cash is searched', async () => {
    const searchBar = wrapper.find('#query')
    await searchBar.setValue('Cash')
    expect(wrapper.findAll('td').length).toEqual(21)
  })
  it('check td count when ca is searched', async () => {
    const searchBar = wrapper.find('#query')
    await searchBar.setValue('ca')
    expect(wrapper.findAll('td').length).toEqual(53)
  })
  it('does not include America when europe is searched', async () => {
    const searchBar = wrapper.find('#query')
    await searchBar.setValue('europe')
    expect(wrapper.text()).not.toContain('America')
  })
})

describe('singular function tests', () => {
  type IRow = stach.factset.protobuf.stach.v2.RowOrganizedPackage.IRow[] | null | undefined;
  const table = ref<IRow>()

  beforeEach(() => {
    const pkg =
      stach.factset.protobuf.stach.v2.RowOrganizedPackage.create(db.data as unknown as stach.factset.protobuf.stach.v2.RowOrganizedPackage)
    table.value = pkg.tables.main.data?.rows
  })

  it('returns true if given row is a header', () => {
    expect(isHeader(table.value![0])).toBeTruthy()
  })

  it('returns false if given row is not a header', () => {
    expect(isHeader(table.value![3])).toBeFalsy()
  })

  it('returns center for horizontal headers', () => {
    expect(alignment(table.value![2], '0', 'horizontal')).toEqual('center')
  })

  it('returns left for horizontal non-header row', () => {
    expect(alignment(table.value![4], '0', 'horizontal')).toEqual('left')
  })

  it('returns baseline for vertical alignment', () => {
    expect(alignment(table.value![0], '0', 'vertical')).toEqual('baseline')
  })

  it('returns zero while colum index is not zero', () => {
    expect(groupLevel(table.value![0], 1)).toEqual(0)
  })

  it('returns special value for null table data', () => {
    expect(groupLevel(table.value![0], 0)).toEqual(11.5)
  })

  it('returns correct value for indented values', () => {
    expect(groupLevel(table.value![7], 0)).toEqual(1)
  })

  it('returns correct value for indented values', () => {
    expect(rowspan(table.value![0], '0')).toEqual(3)
  })

  it('returns correct value for indented values', () => {
    expect(colspan(table.value![0], '3')).toEqual(4)
  })
})
