export function RegisterPayload(email, password,user_type,first_name,last_name){
  return JSON.stringify({
    email:email,
    password:password,
    user_type:user_type,
    first_name:first_name,
    last_name:last_name
  })
}

export function LoginPayload(email,password){
  return JSON.stringify({
    email:email,
    password:password
  })
}
export function VerifyPayload(email,verification_code){
  return JSON.stringify({
    email:email,
    verification_code:verification_code
  })
}

export function setNewPasswordPayload(email,password,confirmed_password){
  return JSON.stringify({
    email:email,
    password:password,
    confirmed_password:confirmed_password
  })
}

export function ForgotPasswordPayload(email){
  return JSON.stringify({
    email:email,
  })
}

export function SolicitorFirmPayload(
  name,
  address,
  mobile,
  dx
){
  return JSON.stringify({
    name: name,
    address: address,
    mobile : mobile,
    dx : dx,
  });
}
export function AgentFirmPayload(
  name,
  address,
  mobile,
  dx
){
  return JSON.stringify({
    agency_name: name,
    office_address: address,
    mobile : mobile,
    agency_dx : dx,
  });
}

export function AddMatterPayload(
  defender_name,
  office_incharge,
  offence_id,
  station_id,
  user_id,
  contact,
  note,
  attachment,
  assigned_agent_id,
  court_id
){
  if(court_id == ''){
    return JSON.stringify({
      defender_name:defender_name,
      office_incharge:office_incharge,
      offence_id:offence_id,
      station_id:station_id,
      user_id:user_id,
      contact:contact,
      note:note,
      attachment:attachment,
      assigned_agent_id:assigned_agent_id,
    });
  }
  else{
    return JSON.stringify({
      defender_name:defender_name,
      office_incharge:office_incharge,
      offence_id:offence_id,
      station_id:station_id,
      user_id:user_id,
      contact:contact,
      note:note,
      attachment:attachment,
      assigned_agent_id:assigned_agent_id,
      court_id:court_id
    });
  }
  
}

export function UpdateMatterPayload(
  defender_name,
  office_incharge,
  offence_id,
  station_id,
  user_id,
  contact,
  note,
  attachment,
  assigned_agent_id,
  court_id
){
  if(court_id == ''){
    return JSON.stringify({
      defender_name:defender_name,
      office_incharge:office_incharge,
      offence_id:offence_id,
      station_id:station_id,
      user_id:user_id,
      contact:contact,
      note:note,
      attachment:attachment,
      assigned_agent_id:assigned_agent_id,
    });
  }
  else{
    return JSON.stringify({
      defender_name:defender_name,
      office_incharge:office_incharge,
      offence_id:offence_id,
      station_id:station_id,
      user_id:user_id,
      contact:contact,
      note:note,
      attachment:attachment,
      assigned_agent_id:assigned_agent_id,
      court_id:court_id
    });
  }
  
}

export function ImagePayload(file){
  return JSON.stringify({
    file,
  });
}
export function NotificationSettingsPayload(
  email_notify,
  push_notify,
  text_notify
){
  return JSON.stringify({
    email_notify:email_notify,
    push_notify:push_notify,
    text_notify:text_notify,
  });
}


export function UpdateProfilePayload(
  first_name,
  last_name,
  phone,
  post_code,
  city_id,
  address,
  email
){
  return JSON.stringify({
    first_name:first_name,
    last_name:last_name,
    phone:phone,
    post_code:post_code,
    city_id:city_id,
    address:address,
    email:email
  });
}

export function ChangePasswordPayload(
  password,
  new_paswword,
  confirmed_password
){
  return JSON.stringify({
    password:password,
    new_password:new_paswword,
    confirmed_password:confirmed_password
  });
}

export function ChangeStatusPayload(
  status
){
  return JSON.stringify({
    status:status
  });
}

export function AttendMatterPayload(
  matter_id,
  user_id,
){
  return JSON.stringify({
    matter_id:matter_id,
    user_id:user_id,
  });
}
export function ApproveAgentPayload(
  assigned_agent_id
){
  return JSON.stringify({
    assigned_agent_id:assigned_agent_id
  });
}
export function UpdateStationPayload(
  name
){
  return JSON.stringify({
    name:name
  });
}
export function UpdateSolicitorPayload(
  available,
  status,
  first_name,
  last_name,
  phone
){
  return JSON.stringify({
    available:available,
    status:status,
    first_name:first_name,
    last_name:last_name,
    phone:phone,
  });
}
export function addTempletePayload(
  title,
  subject,
  type,
  content
){
  return JSON.stringify({
    title:title,
    subject:subject,
    type:type,
    content:content
  });
}
export function addPreferedStationsPayload(
  station_ids
){
  return JSON.stringify({
    station_ids:station_ids,
  });
}
export function AddInvoiceToMatterPayload(
  invoice_document
){
  return JSON.stringify({
    invoice_document:invoice_document
  })
}
export function addDocumentPayload(
  document
){
  return JSON.stringify({
    document:document
  })
}

export function addCourtPayload(
  name,
  country_id,
  state_id,
  city_id,
  post_code,
  phone,
  is_enable,
){
  return JSON.stringify({
    name:name,
    country_id:country_id,
    state_id:state_id,
    city_id:city_id,
    post_code:post_code,
    phone:phone,
    is_enable:is_enable
  })
}
export function addStationPayload(
  name,
  country_id,
  state_id,
  city_id,
  post_code,
  phone,
  is_enable,
){
  return JSON.stringify({
    name:name,
    country_id:country_id,
    state_id:state_id,
    city_id:city_id,
    post_code:post_code,
    mobile:phone,
    is_enable:is_enable
  })
}