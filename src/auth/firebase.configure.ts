import * as firebaseAdmin from 'firebase-admin';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  privateKey:
    '-----BEGIN PRIVATE KEY-----\\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCpr4tAtJvLFQtm\\nPEP5JyAnSWAyBxht7vEgpnYcVMsOzuXonraI9UxvCCq5ay7AWN/Xw5o1avCvyGS+\\nGQCUQZI8hF/TkignjJTPFNpWGJPuSUXU7ue1SeGX6muMWYfaOBNYelif0kCGvqpo\\nylcUQPZK7X5cEGvSpPdievJusaf8LoD07n4QTBldaAI9XilKtznMr0nvF4+p5wam\\np58v0McKvhei4VFi/X/7PLRIcweoSmoUZIQamBt+k+4YCQUbewP88EvMzLFQ+jku\\nt8NN0vWx2lCqDOT5pI0DHuA8XWdraJyfzSrz2sIM2U5z6xoQbUYKdlHCDmKg4GRP\\neMXrSMXHAgMBAAECggEANMitHi8wiV9eAOr9UAtqNp5eJKHNaSEbdAckFZMQ6WXV\\n4eNBL+ByatWVCMG9NMtQslsf5L8D6QKCyBmZ8wRku5uH/ZXpFMhn3/UCKCcUGVtE\\ntESu4ld9rBaZZvrQxkKMTgkc+XZbaS71boyGwv+kPdGb7YKUL93uMH3DXUi5UzoY\\nALqpAuKi+wlp1A3jMBhIFtlZQMYXFtRxLTemx+SQ8rzncwc+Wx7KatEIX27xcKiu\\nDVoW9uPTrJP5AWt8TaUNkQTn7odT3fWiKHT8t0FnNLbUEtt4U7FdGm0I2KZQfto/\\nYx8L63QmRDQeGctpfu0zhPdLxNQGivLTCEObb7BYcQKBgQDhyrIULp539Hi9A7LO\\nBemaabrrge+KnlRWD/uPDtKazu/yuJKFNV5YEeLCemdfYZOgtTcLymiFzuF5ynlr\\nFLOB9axzxpu9XgY7ER8yIzTIjLawneJKZU7uaM4MQwx2qe3h9229cJNGRi8hxgT8\\n06hq5DYGCIvmidR41qNc6CWxEQKBgQDAYztON5mUALXMFcpVGNi+/3uCcg/a101/\\ns2yd+3EswDyYm1avXfwCtyKdVQbONexg7pynpflRQZ+8jyd+CNjIvnurBpvPkrhR\\nmHlQ44RL0jdmPM6DKHCB4Wt9dtGBwM+R2RiVyL7ZyDRYZHhAtSQcQDQEn5zgJavW\\nb/dmf0AJVwKBgGsmov3a5c8tUEL6x1boDWT++fqbbg8Ndh5ldU79jMp0nABGwRnA\\nKuaGjmMWbYohJ0rj1Jye0J13gR8oDBjZ+RoaeV10CiKCxVgwlupXNMxborMMKgB+\\nNUgEqou9IeQKXl6W6hg1nV6DHgjcDS/iThFz/YM9eQ7Np+w0h9AmRwTRAoGAJ5wG\\nmMr/tqYSx+rwlmagMWq+ThQXyZGsZg9V3IzpNzJ5B15sEX0DJrf3y3a3CPu3KBnY\\nbPfSBfXB4nuCwQMnRuVY5tRcffcSNdJzn8DH+yhTuZvpVL2dtE/p5pHw/oro8XlG\\nA4iqKoJ6rHw6+e+ReLOLQixuiwOWhnbU8+hdEc8CgYAczo2LdmsQBX2K9/x/OiSL\\nIWmJm5GMYa7wryopiNWdTfDe+y30gZ/ImHQhewfSkNJfYa1+SyA/B4NGt+EqGjiu\\nRzmOlhg9yoISEnPyPfc6V4xBwxPXNb1y+VgmJVLng0dXmQwbQzCTi0aL8rxYvoxg\\nBdwE5QNxaCQHvnIzb4kqsQ==\\n-----END PRIVATE KEY-----\\n'.replace(
      /\\n/g,
      '\n',
    ),
  clientEmail:
    'firebase-adminsdk-qkt0c@bookcrossing-ce1b6.iam.gserviceaccount.com',
  projectId: 'bookcrossing-ce1b6',
  apiKey: 'AIzaSyDv7f3OqqS2s4xGDqDwD7xKIeisuZrIxLU',
};

firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebaseConfig),
});
export { firebaseAdmin };
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
