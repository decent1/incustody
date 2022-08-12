//Host Name Live
const hostName ="https://api.emanchemicals.com/api/"



//End Points
const register = 'register';
const login = 'login';
const verify = 'verify';
const setNewPassword = "set-new-password";

const forgotPassword = 'forgot-password';
const solicitorFirm = 'solicitor/firm'
const agentFirm = 'agents'
const matters = 'matters'
const uploads = 'uploads'

//Get End Points
const offences ='offences'
const countries = 'countries'
const states = 'states'
const stations = 'stations'
const courts = 'courts'
const dashboard = 'dashboard'


const activityLogs = 'activity_logs'
const notificationSettings = 'notification-settings'
const users = 'users'
const cities = 'cities'
const changePassword = 'change-password'

const changeStatus = 'matters/change-status/'
const attendMatter = 'attend-matter'
const ApproveAgent = 'matters/approve/'

const getAllSolicitors = 'solicitors'
const updateSolicitor = 'users/update-status'
const getAllAgents = 'agents'

const addTemplete = 'templates'
const getTempletes = 'templates'
const addPreferedStations = 'agents/preffered-station'

const documents = 'documents'

function getFullApi(endPoint) {
    return hostName + endPoint
}

//USER
export function RegisterAPI(){
    return getFullApi(register)
}
export function LoginAPI() {
    return getFullApi(login)
}
export function ForgotPasswordAPI(){
    return getFullApi(forgotPassword)
}
export function SolicitorFirmAPI(){
    return getFullApi(solicitorFirm)
}
export function AgentFirmAPI(){
    return getFullApi(agentFirm)
}
export function AddMatterAPI() {
    return getFullApi(matters)
}
export function UpdateMatterAPI(id) {
    return getFullApi(matters) + '/' + id
}
export function GetMatterAPI(page,per_page) {
    return getFullApi(matters)  + '?page=' + page + "&per_page=" + per_page
}
export function GetMatterDetailsAPI(id) {
    return getFullApi(matters) + '/' + id
}
//Get Request function
export function offencesAPI(page,per_page){
    return getFullApi(offences)  + '?page=' + page + "&per_page=" + per_page
}
export function CountryAPI(page,per_page){
    return getFullApi(countries)  + '?page=' + page + "&per_page=" + per_page
}
export function StateAPI(page,per_page, country_id){
    return getFullApi(states)  + '?page=' + page + "&per_page=" + per_page + "&country_id=" + country_id
}
export function CityAPI(page,per_page, country_id, state_id){
    return getFullApi(cities)  + '?page=' + page + "&per_page=" + per_page + "&country_id=" + country_id  + "&state_id=" + state_id
}
export function StationAPI(page,per_page){
    return getFullApi(stations)  + '?page=' + page + "&per_page=" + per_page
}
export function CourtAPI(page,per_page){
    return getFullApi(courts)  + '?page=' + page + "&per_page=" + per_page
}
export function DeleteCourtAPI(id){
    return getFullApi(courts) + '/' + id
}
export function UpdateStationAPI(id){
    return getFullApi(stations)+'/'+id
}
export function DashboardAPI(){
    return getFullApi(dashboard)
}
export function VerifyAPI(){
    return getFullApi(verify)
}
export function setNewPasswordAPI(){
    return getFullApi(setNewPassword)
}
export function getActivityLogsAPI(page,per_page){
    return getFullApi(activityLogs)  + '?page=' + page + "&per_page=" + per_page
}
export function NotificationSettingsAPI(){
    return getFullApi(notificationSettings)
}
export function UpdateProfileAPI(){
    return getFullApi(users)
}
export function GetCitiesAPI(){
    return getFullApi(cities)
}
export function ChangePasswordAPI(){
    return getFullApi(changePassword)
}
export function ChangeStatusAPI(id){
    return getFullApi(changeStatus) + id
}
export function AttendMatterAPI(){
    return getFullApi(attendMatter)
}
export function ApproveAgentAPI(id){
    return getFullApi(ApproveAgent) + id
}
export function GetAllSolicitorsAPI(page,per_page){
    return getFullApi(getAllSolicitors) + '?page=' + page + "&per_page=" + per_page
}
export function UpdateSolicitorsAPI(id){
    return getFullApi(updateSolicitor)+"/"+id
}
export function GetAllAgentsAPI(page,per_page){
    return getFullApi(getAllAgents) + '?page=' + page + "&per_page=" + per_page
}
export function DeleteMatterAPI(id){
    return getFullApi(matters)+"/"+id
}
export function AddInvoiceToMatterAPI(id){
    return getFullApi(matters)+"/"+id
}
export function getTempletesAPI(){
    return getFullApi(getTempletes)
}
export function addTempleteAPI(){
    return getFullApi(addTemplete)
}
export function addPreferedStationsAPI(){
    return getFullApi(addPreferedStations)
}
export function UploadImage(){
    return getFullApi(uploads)
}
export function getAllDocuments(page,per_page){
    return getFullApi(documents) + '?page=' + page + "&per_page=" + per_page
}
export function addDocumentAPI(){
    return getFullApi(documents)
}
export function downloadDocument(id){
    return getFullApi(documents)+"/"+id
}
export function AddCourtAPI(){
    return getFullApi(courts)
}
export function UpdateCourtAPI(id){
    return getFullApi(courts) + '/' + id
}
export function DeleteStationAPI(id){
    return getFullApi(stations) + '/' + id
}
export function AddStationAPI(){
    return getFullApi(stations)
}