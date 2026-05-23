/** UI copy for the Contact page template. */
export const CONTACT_COPY = {
  contact: {
    hero: {
      tag:      'Contact',
      title:    'Get in Touch',
      subtitle: 'We\'d love to hear from you — reach out anytime.',
    },
    form: {
      name:    'Full Name',
      email:   'Email Address',
      message: 'Your Message',
      submit:  'Send Message',
    },
    info: {
      address: 'Address',
      email:   'Email',
      phone:   'Phone',
      hours:   'Office Hours',
    },
  },
};

export type ContactInfoKey = keyof typeof CONTACT_COPY.contact.info;
