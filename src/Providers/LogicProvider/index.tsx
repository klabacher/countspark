/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from 'Providers/SupabaseProvider'
import LogicStoreType from 'Types/LogicStoreType'
import { toast } from 'react-toastify'
import i18n from 'Providers/InternationalizationProvider'

const LogicProvider = {
  async listCounters(userId: string): Promise<{
    success: boolean
    data: Array<LogicStoreType['ProjectList'][0]> | any
    status?: number
  }> {
    try {
      console.log('Listing logic stores for user...', userId)
      // Supabase query to list counters for a user
      const { data, status, error } = await supabase
        .from('counters')
        .select('id, title, created_at, updated_at, status')
        .eq('user_id', userId)

      if (error) {
        return { success: false, data: error, status: status }
      }

      // Map Supabase data to ProjectItem
      const mappedData = data.map((item: any) => ({
        id: item.id,
        title: item.title,
        status: item.status === 'active' ? 'online' : item.status || 'online', // Map active to online
        date_created: item.created_at,
        date_update: item.updated_at
      }))

      console.log('Logic stores listed, status:', status)
      return { success: true, data: mappedData, status: status }
    } catch (error) {
      console.error('Error listing logic stores:', error)
      toast.error(i18n.t('hud.LogicProvider.listError'))
      return { success: false, data: error }
    }
  },
  async fetchCounterData(id: string): Promise<{
    success: boolean
    data: LogicStoreType['Settings'] | any
    status?: number
  }> {
    try {
      console.log('Fetching logic store data...', id)
      // Supabase query to fetch counters data by id
      const { data, status, error } = await supabase
        .from('counters')
        .select('*')
        .eq('id', id)
        .single()

      if (error) {
        return { success: false, data: error, status: status }
      }

      return { success: true, data }
    } catch (error) {
      console.error('Error fetching logic store data:', error)
      toast.error(i18n.t('hud.LogicProvider.fetchError'))
      return { success: false, data: error }
    }
  },
  async updateCounterData(
    id: string,
    data: Partial<LogicStoreType['Settings']>
  ): Promise<{
    success: boolean
    data?: any
    status?: number
  }> {
    // Função para atualizar o LogicStore no backend
    try {
      console.log('Updating logic store data...', id, data)
      const { error, status } = await supabase
        .from('counters')
        .update({ title: data.Texts?.title || 'New project', settings: data })
        .eq('id', id)

      if (error) {
        console.error('Error updating logic store data:', error)
        toast.error(i18n.t('hud.LogicProvider.updateError'))
        return { success: false, data: error }
      } else {
        toast.success(i18n.t('hud.LogicProvider.updateSuccess'))
        return { success: true, status: status }
      }
    } catch (error) {
      console.error('Error updating logic store data:', error)
      toast.error(i18n.t('hud.LogicProvider.updateError'))
      return { success: false, data: error }
    }
  }
}

export default LogicProvider
