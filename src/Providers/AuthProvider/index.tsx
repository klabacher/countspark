/* eslint-disable @typescript-eslint/no-explicit-any */
import supabase from 'Providers/SupabaseProvider'
import Store from 'Providers/ReduxProvider/Store'
import {
  authStart,
  authSuccess,
  authFail,
  logout as logoutAction
} from 'Providers/ReduxProvider/DOMState'
import { UserProfile } from 'Types/DOMStateType'
import { toast } from 'react-toastify'
import {
  isValidEmail,
  isValidName,
  isValidPassword,
  sanitizeInput
} from 'Utils/validation'
import i18n from 'Providers/InternationalizationProvider'

// Tipo para os argumentos de Login
type LoginArgs = {
  email: string
  password: string
}

// Tipo para os argumentos de Registro
type RegisterArgs = {
  name: string
  email: string
  password: string
}

const AuthProvider = {
  async LoginLogic({ email, password }: LoginArgs): Promise<string | null> {
    const dispatch = Store.dispatch

    // 1. Validação
    const cleanEmail = sanitizeInput(email)
    if (!isValidEmail(cleanEmail)) {
      const msg = i18n.t('hud.AuthPage.Errors.emailInvalid')
      toast.error(msg)
      return msg
    }
    if (!password) {
      const msg = i18n.t('hud.AuthPage.Errors.passwordRequired')
      toast.error(msg)
      return msg
    }

    dispatch(authStart())

    try {
      // 2. Autenticar no Supabase Auth
      const { data: authData, error: authError } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password
        })

      if (authError) throw authError
      if (!authData.user) throw new Error('Usuário não encontrado')

      // 3. Buscar dados extras na tabela 'profiles' (nome, role)
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authData.user.id)
        .single()

      if (profileError) throw profileError

      // 4. Montar o objeto do usuário robusto
      const userProfile: UserProfile = {
        id: authData.user.id,
        email: authData.user.email || '',
        name: profileData.name || '', // Vem da tabela profiles
        role: (profileData.role as 'user' | 'admin' | 'guest') || 'user' // Vem da tabela profiles
      }

      // 5. Salvar no Redux
      dispatch(
        authSuccess({
          user: userProfile,
          token: authData.session?.access_token || ''
        })
      )
      toast.success(i18n.t('hud.HomePage.welcomeBack'))
      return null
    } catch (error: any) {
      console.error('Login error:', error)

      let msg = i18n.t('hud.AuthPage.Errors.genericError')
      let isServerError = false

      // Tratamento de erros específicos
      if (error.message === 'Invalid login credentials') {
        msg = i18n.t('hud.AuthPage.Errors.invalidCredentials')
      } else if (
        error.status === 500 ||
        (error.message && error.message.toLowerCase().includes('network')) ||
        error.code === '500' ||
        error.name === 'AuthRetryableFetchError' ||
        (error.message && error.message.includes('AuthRetryableFetchError'))
      ) {
        msg = i18n.t('hud.AuthPage.Errors.systemError')
        isServerError = true
      }

      dispatch(authFail(msg))
      toast.error(msg)

      if (isServerError) {
        // Logout forçado para limpar estado inconsistente
        dispatch(logoutAction())
        await supabase.auth.signOut()
      }

      return msg
    }
  },

  async RegisterLogic({
    name,
    email,
    password
  }: RegisterArgs): Promise<string | null> {
    const dispatch = Store.dispatch

    // 1. Validação Rigorosa
    const cleanName = sanitizeInput(name)
    const cleanEmail = sanitizeInput(email)

    if (!isValidName(cleanName)) {
      const msg = 'Nome contém caracteres inválidos'
      toast.error(msg)
      return msg
    }
    if (!isValidEmail(cleanEmail)) {
      const msg = 'Email inválido'
      toast.error(msg)
      return msg
    }
    if (!isValidPassword(password)) {
      const msg = 'Senha deve ter no mínimo 8 caracteres, uma letra e um número'
      toast.error(msg)
      return msg
    }

    dispatch(authStart())

    try {
      // 2. Criar conta no Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: cleanEmail,
        password,
        options: {
          data: {
            name: cleanName
          }
        }
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('Erro ao criar usuário')

      const userProfile: UserProfile = {
        id: authData.user.id,
        email: authData.user.email,
        name: cleanName,
        role: 'user'
      }

      dispatch(
        authSuccess({
          user: userProfile,
          token: authData.session?.access_token || ''
        })
      )
      // Navigation to activation page is handled by the component
      toast.success('Conta criada com sucesso!')
      return null
    } catch (error: any) {
      console.error('Register error:', error)
      const msg = error.message || 'Falha ao registrar'
      dispatch(authFail(msg))
      toast.error(msg)
      return msg
    }
  },

  async LogoutLogic() {
    const dispatch = Store.dispatch
    try {
      await supabase.auth.signOut()
      dispatch(logoutAction())
      localStorage.clear() // Limpa dados sensíveis se houver
    } catch (error) {
      console.error('Logout error:', error)
    }
  }
}

export default AuthProvider
