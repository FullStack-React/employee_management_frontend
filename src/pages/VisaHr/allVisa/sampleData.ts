// if visa.opt_receipt === unsubmitted, remove this from preview list.....

type employee = {
  id: string;
  fullName: string;
  userName: string;
  workAuth: {
    title: string;
    startDate: string;
    endDate: string;
    remainingDays: number;
  };
  nextStep: string;

  visa: {
    opt_receipt: string;
    opt_ead: string;
    i983: string;
    i20: string;
  };
};

export const sampleData: employee[] = [
  {
    id: '1',
    fullName: 'Chen yi',
    userName: 'chenyi',
    workAuth: {
      title: 'H1-B',
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      remainingDays: 100,
    },
    nextStep: 'Submit OPT receipt',
    visa: {
      opt_receipt: 'Unsubmitted',
      opt_ead: 'Unsubmitted',
      i983: 'Unsubmitted',
      i20: 'Unsubmitted',
    },
  },
  {
    id: '2',
    fullName: 'Wang Er',
    userName: 'lll',
    workAuth: {
      title: 'L2',
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      remainingDays: 100,
    },
    nextStep: 'OPT Receipt: wait for HR approval',
    visa: {
      opt_receipt: 'Pending',
      opt_ead: 'Unsubmitted',
      i983: 'Unsubmitted',
      i20: 'Unsubmitted',
    },
  },
  {
    id: '3',
    fullName: 'Li San',
    userName: 'lisan',
    workAuth: {
      title: 'H1-B',
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      remainingDays: 100,
    },
    nextStep: 'Submit OPT EAD',
    visa: {
      opt_receipt: 'Approved',
      opt_ead: 'Unsubmitted',
      i983: 'Unsubmitted',
      i20: 'Unsubmitted',
    },
  },
  {
    id: '4',
    fullName: 'Zhang Si',
    userName: 'zhangsi',
    workAuth: {
      title: 'L2',
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      remainingDays: 100,
    },
    nextStep: 'OPT EAD: wait for HR approval',
    visa: {
      opt_receipt: 'Approved',
      opt_ead: 'Rejected',
      i983: 'Unsubmitted',
      i20: 'Unsubmitted',
    },
  },
  {
    id: '5',
    fullName: 'Wu Wu',
    userName: 'bbbb',
    workAuth: {
      title: 'H1-B',
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      remainingDays: 100,
    },
    nextStep: 'Submit I-983',
    visa: {
      opt_receipt: 'Approved',
      opt_ead: 'Approved',
      i983: 'Unsubmitted',
      i20: 'Unsubmitted',
    },
  },
  {
    id: '6',
    fullName: 'Zhao Liu',
    userName: 'ccccc',
    workAuth: {
      title: 'F1-OPT',
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      remainingDays: 100,
    },
    nextStep: 'Submit I-20',
    visa: {
      opt_receipt: 'Approved',
      opt_ead: 'Approved',
      i983: 'Approved',
      i20: 'Unsubmitted',
    },
  },
  {
    id: '7',
    fullName: 'Qian Qi',
    userName: 'ddddd',
    workAuth: {
      title: 'H1-B',
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      remainingDays: 100,
    },
    nextStep: 'Submit I-983',
    visa: {
      opt_receipt: 'Approved',
      opt_ead: 'Approved',
      i983: 'Pending',
      i20: 'Unsubmitted',
    },
  },
  {
    id: '8',
    fullName: 'Sun Ba',
    userName: 'eeee',
    workAuth: {
      title: 'L2',
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      remainingDays: 100,
    },
    nextStep: 'Submit I-20',
    visa: {
      opt_receipt: 'Approved',
      opt_ead: 'Approved',
      i983: 'Approved',
      i20: 'Pending',
    },
  },
  {
    id: '9',
    fullName: 'Zhou Jiu',
    userName: 'fffff',
    workAuth: {
      title: 'H1-B',
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      remainingDays: 100,
    },
    nextStep: 'All documents have been approved',
    visa: {
      opt_receipt: 'Approved',
      opt_ead: 'Approved',
      i983: 'Approved',
      i20: 'Approved',
    },
  },

  {
    id: '1',
    fullName: 'Chen yi',
    userName: 'chenyi',
    workAuth: {
      title: 'H1-B',
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      remainingDays: 100,
    },
    nextStep: 'Submit OPT receipt',
    visa: {
      opt_receipt: 'Unsubmitted',
      opt_ead: 'Unsubmitted',
      i983: 'Unsubmitted',
      i20: 'Unsubmitted',
    },
  },
  {
    id: '2',
    fullName: 'Wang Er',
    userName: 'lll',
    workAuth: {
      title: 'L2',
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      remainingDays: 100,
    },
    nextStep: 'OPT Receipt: wait for HR approval',
    visa: {
      opt_receipt: 'Pending',
      opt_ead: 'Unsubmitted',
      i983: 'Unsubmitted',
      i20: 'Unsubmitted',
    },
  },
  {
    id: '3',
    fullName: 'Li San',
    userName: 'lisan',
    workAuth: {
      title: 'H1-B',
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      remainingDays: 100,
    },
    nextStep: 'Submit OPT EAD',
    visa: {
      opt_receipt: 'Approved',
      opt_ead: 'Unsubmitted',
      i983: 'Unsubmitted',
      i20: 'Unsubmitted',
    },
  },
  {
    id: '4',
    fullName: 'Zhang Si',
    userName: 'zhangsi',
    workAuth: {
      title: 'L2',
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      remainingDays: 100,
    },
    nextStep: 'OPT EAD: wait for HR approval',
    visa: {
      opt_receipt: 'Approved',
      opt_ead: 'Pending',
      i983: 'Unsubmitted',
      i20: 'Unsubmitted',
    },
  },
  {
    id: '5',
    fullName: 'Wu Wu',
    userName: 'bbbb',
    workAuth: {
      title: 'H1-B',
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      remainingDays: 100,
    },
    nextStep: 'Submit I-983',
    visa: {
      opt_receipt: 'Approved',
      opt_ead: 'Approved',
      i983: 'Unsubmitted',
      i20: 'Unsubmitted',
    },
  },
  {
    id: '6',
    fullName: 'Zhao Liu',
    userName: 'ccccc',
    workAuth: {
      title: 'F1-OPT',
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      remainingDays: 100,
    },
    nextStep: 'Submit I-20',
    visa: {
      opt_receipt: 'Approved',
      opt_ead: 'Approved',
      i983: 'Approved',
      i20: 'Unsubmitted',
    },
  },
  {
    id: '7',
    fullName: 'Qian Qi',
    userName: 'ddddd',
    workAuth: {
      title: 'H1-B',
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      remainingDays: 100,
    },
    nextStep: 'Submit I-983',
    visa: {
      opt_receipt: 'Approved',
      opt_ead: 'Approved',
      i983: 'Pending',
      i20: 'Unsubmitted',
    },
  },
  {
    id: '8',
    fullName: 'Sun Ba',
    userName: 'eeee',
    workAuth: {
      title: 'L2',
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      remainingDays: 100,
    },
    nextStep: 'Submit I-20',
    visa: {
      opt_receipt: 'Approved',
      opt_ead: 'Approved',
      i983: 'Approved',
      i20: 'Pending',
    },
  },
  {
    id: '9',
    fullName: 'Zhou Jiu',
    userName: 'fffff',
    workAuth: {
      title: 'H1-B',
      startDate: '2021-01-01',
      endDate: '2024-01-01',
      remainingDays: 100,
    },
    nextStep: 'All documents have been approved',
    visa: {
      opt_receipt: 'Approved',
      opt_ead: 'Approved',
      i983: 'Approved',
      i20: 'Approved',
    },
  },
];
