import { useAdminAuth } from '../hooks'

const WithAuth = (props: any) => useAdminAuth(props) && props.children

export default WithAuth
