declare module "mailersend" {
    export class MailerSend {
      constructor(options: { apiKey: string })
  
      email: EmailModule
    }
  
    export class EmailModule {
      send(params: EmailParams): Promise<any>
    }
  
    export class EmailParams {
      setFrom(sender: Sender): this
      setTo(recipients: Recipient[]): this
      setCc(recipients: Recipient[]): this
      setBcc(recipients: Recipient[]): this
      setReplyTo(recipient: Recipient): this
      setSubject(subject: string): this
      setHtml(html: string): this
      setText(text: string): this
      setTemplateId(templateId: string): this
      setPersonalization(personalization: any[]): this
      setAttachments(attachments: any[]): this
    }
  
    export class Recipient {
      constructor(email: string, name?: string)
      email: string
      name?: string
    }
  
    export class Sender {
      constructor(email: string, name?: string)
      email: string
      name?: string
    }
  }
  
  