'use strict'
import { utilService } from "../../../services/util.service.js"
import { emails } from "./emailDB.js"

export const mailService = {
    getEmails,
    setReadState,
    deleteEmail,
    toggleReadState,
    toggleStarredEmail,
    updateDraft,
    createDraft,
    sendEmail,
    getEmailById,
    getUnreadCount
}


const loggedinUser = {
    email: 'Me@appsus.com',
    fullname: 'Email Megidish'
}

function getEmails(filterBy) {
    let { status, txt, isRead, isStarred } = filterBy
    let emailsForDisplay = emails.filter(email => {
        return email.status === status
            && (email.subject.toLowerCase().includes(txt.toLowerCase())
                || email.body.toLowerCase().includes(txt.toLowerCase())
                || email.to.toLowerCase().includes(txt.toLowerCase())
                || email.from.toLowerCase().includes(txt.toLowerCase()))
    })

    // if starred emails
    if (isStarred !== null) emailsForDisplay = emails.filter(email => email.isStarred)
    if (isRead !== null) emailsForDisplay = emailsForDisplay.filter(email => email.isRead === isRead)
    return Promise.resolve(emailsForDisplay)
}

function setReadState(emailId) {
    let selectedEmail = emails.find(email => email.id === emailId)
    selectedEmail.isRead = true
}

function deleteEmail(emailId) {
    let selectedEmailIdx = emails.findIndex(email => email.id === emailId)
    let email = emails[selectedEmailIdx]

    if (email.status === 'trash') {
        return Promise.resolve(emails.splice(selectedEmailIdx, 1))
    } else {
        email.status = 'trash'
        return Promise.resolve(email)
    }
}

function toggleStarredEmail(emailId) {
    let selectedEmail = emails.find(email => email.id === emailId)
    selectedEmail.isStarred = !selectedEmail.isStarred
    return Promise.resolve()
}

function toggleReadState(emailId) {
    let selectedEmail = emails.find(email => email.id === emailId)
    selectedEmail.isRead = !selectedEmail.isRead
    return Promise.resolve(selectedEmail)
}

function _createEmail(emailInfo) {
    let { subject, recepient, messageBody } = emailInfo
    let newEmail = {
        id: utilService.makeId(),
        from: loggedinUser.email,
        subject,
        body: messageBody,
        isRead: false,
        sentAt: Date.now(),
        to: recepient,
        isStarred: false,
        status: 'draft'
    }
    return Promise.resolve(newEmail)
}

function sendEmail(draftId, emailInfo) {
    let { subject, recepient, messageBody } = emailInfo
    let selectedDraft = emails.find(draft => draft.id === draftId)
    selectedDraft.body = messageBody
    selectedDraft.subject = subject
    selectedDraft.to = recepient
    selectedDraft.sentAt = Date.now()
    selectedDraft.status = 'sent'

    return Promise.resolve()
}

function createDraft(draftInfo) {
    let draft = _createEmail(draftInfo).then(res => {
        emails.push(res)
        return Promise.resolve(res)
    })
    return draft
}

function updateDraft(draftId, draftInfo) {
    let { subject, recepient, messageBody } = draftInfo
    let selectedDraft = emails.find(draft => draft.id === draftId)
    selectedDraft.body = messageBody
    selectedDraft.subject = subject
    selectedDraft.to = recepient
}

function getEmailById(emailId) {
    let email = emails.find(email => email.id === emailId)
    return Promise.resolve(email)
}

function getUnreadCount() {
    let unreadInInbox = emails.filter(mail => {
        return mail.status === 'inbox' && !mail.isRead
    }).length


    return unreadInInbox
}
