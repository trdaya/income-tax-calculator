const months = ['April', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

(() => {
  const salaryTable = document.getElementById('salaryTable');
  const newInnerHTML = months.map((month, index) => {
    const numString = `${index + 1}`;
    return `<tr>
    <td>${numString}</td>
    <td>${month}</td>
    <td><input type='number' id='BASIC_${numString}'></td>
    <td><input type='number' id='HRA_${numString}'></td>
    <td><input type='number' id='TOTAL_INCOME_${numString}'></td>
    <td><input type='number' id='RENT_${numString}'></td>
  </tr>`;
  })
    .concat([`<tr>
    <td></td>
    <td>Total</td>
    <td><span id='TOTAL_BASIC'></span></td>
    <td><span id='TOTAL_HRA'></span></td>
    <td><span id='TOTAL_YEARLY_INCOME'></span></td>
    <td><span id='TOTAL_RENT_PAID'></span></td>
  </tr>`])
    .join('');
  salaryTable.innerHTML += newInnerHTML;
})();

const LAKHS = {
  '2.5': 250000,
  '5': 500000,
  '10': 1000000,
};

const onFill = (type) => {
  const firstValue = +document.getElementById(`${type}_1`).value;
  for (let i = 0; i < 12; i++) {
    document.getElementById(`${type}_${i + 1}`).value = firstValue;
  }
};

const calculate = () => {
  let TOTAL_BASIC = 0;
  let TOTAL_HRA = 0;
  let TOTAL_YEARLY_INCOME = 0;
  let TOTAL_RENT_PAID = 0;

  for (let i = 0; i < 12; i++) {
    TOTAL_BASIC = TOTAL_BASIC + (+document.getElementById(`BASIC_${i + 1}`).value);
    TOTAL_HRA = TOTAL_HRA + (+document.getElementById(`HRA_${i + 1}`).value);
    TOTAL_YEARLY_INCOME = TOTAL_YEARLY_INCOME + (+document.getElementById(`TOTAL_INCOME_${i + 1}`).value);
    TOTAL_RENT_PAID = TOTAL_RENT_PAID + (+document.getElementById(`RENT_${i + 1}`).value);
  }

  document.getElementById('TOTAL_BASIC').innerHTML = `${TOTAL_BASIC}`;
  document.getElementById('TOTAL_HRA').innerHTML = `${TOTAL_HRA}`;
  document.getElementById('TOTAL_YEARLY_INCOME').innerHTML = `${TOTAL_YEARLY_INCOME}`;
  document.getElementById('TOTAL_RENT_PAID').innerHTML = `${TOTAL_RENT_PAID}`;

  const HRA_CONDITION_1 = TOTAL_HRA;
  let HRA_CONDITION_2 = 0;
  if (TOTAL_RENT_PAID) {
    HRA_CONDITION_2 = Math.abs(TOTAL_RENT_PAID - ((10 / 100) * TOTAL_BASIC));
  }
  const HRA_CONDITION_3 = (50 / 100) * TOTAL_BASIC;
  const HRA_EXEMPTION = Math.min(HRA_CONDITION_1, HRA_CONDITION_2, HRA_CONDITION_3);

  document.getElementById('HRA_CONDITION_1').innerHTML = `${HRA_CONDITION_1}`;
  document.getElementById('HRA_CONDITION_2').innerHTML = `${HRA_CONDITION_2}`;
  document.getElementById('HRA_CONDITION_3').innerHTML = `${HRA_CONDITION_3}`;
  document.getElementById('HRA_EXEMPTION').innerHTML = `${HRA_EXEMPTION}`;

  const OTHER_EXEMPTIONS = +document.getElementById('OTHER_EXEMPTIONS').value;
  const TOTAL_TAXABLE_INCOME = TOTAL_YEARLY_INCOME - HRA_EXEMPTION - OTHER_EXEMPTIONS;
  document.getElementById('TOTAL_TAXABLE_INCOME').innerHTML = `${TOTAL_TAXABLE_INCOME}`;

  if (TOTAL_TAXABLE_INCOME > 0) {
    let TAXABLE_1 = 0;
    let TAXABLE_2 = 0;
    let TAXABLE_3 = 0;
    let TAXABLE_4 = 0;

    if (TOTAL_TAXABLE_INCOME <= LAKHS['2.5']) {
      TAXABLE_1 = TOTAL_TAXABLE_INCOME - LAKHS['2.5'];
    } else if ((LAKHS['2.5'] < TOTAL_TAXABLE_INCOME) && (TOTAL_TAXABLE_INCOME <= LAKHS['5'])) {
      TAXABLE_1 = LAKHS['2.5'];
      TAXABLE_2 = TOTAL_TAXABLE_INCOME - LAKHS['2.5'];
    } else if ((LAKHS['5'] < TOTAL_TAXABLE_INCOME) && (TOTAL_TAXABLE_INCOME <= LAKHS['10'])) {
      TAXABLE_1 = LAKHS['2.5'];
      TAXABLE_2 = LAKHS['2.5'];
      TAXABLE_3 = TOTAL_TAXABLE_INCOME - LAKHS['5'];
    } else if (LAKHS['10'] < TOTAL_TAXABLE_INCOME) {
      TAXABLE_1 = LAKHS['2.5'];
      TAXABLE_2 = LAKHS['2.5'];
      TAXABLE_3 = LAKHS['5'];
      TAXABLE_4 = TOTAL_TAXABLE_INCOME - LAKHS['10'];
    }

    const TAX_1 = 0;
    const TAX_2 = (5 / 100) * TAXABLE_2;
    const TAX_3 = (20 / 100) * TAXABLE_3;
    const TAX_4 = (30 / 100) * TAXABLE_4;

    document.getElementById('TAXABLE_1').innerHTML = `${TAXABLE_1}`;
    document.getElementById('TAXABLE_2').innerHTML = `${TAXABLE_2}`;
    document.getElementById('TAXABLE_3').innerHTML = `${TAXABLE_3}`;
    document.getElementById('TAXABLE_4').innerHTML = `${TAXABLE_4}`;
    document.getElementById('TAX_1').innerHTML = `${TAX_1}`;
    document.getElementById('TAX_2').innerHTML = `${TAX_2}`;
    document.getElementById('TAX_3').innerHTML = `${TAX_3}`;
    document.getElementById('TAX_4').innerHTML = `${TAX_4}`;

    const TOTAL_TAX = TAX_1 + TAX_2 + TAX_3 + TAX_4;
    const CESS = (3 / 100) * TOTAL_TAX;
    const FINAL_TOTAL_TAX = TOTAL_TAX + CESS;
    const FINAL_TOTAL_TAX_PER_MONTH = FINAL_TOTAL_TAX / 12;

    document.getElementById('TOTAL_TAX').innerHTML = `${TOTAL_TAX}`;
    document.getElementById('CESS').innerHTML = `${CESS}`;
    document.getElementById('FINAL_TOTAL_TAX').innerHTML = `${FINAL_TOTAL_TAX}`;
    document.getElementById('FINAL_TOTAL_TAX_PER_MONTH').innerHTML = `${FINAL_TOTAL_TAX_PER_MONTH}`;
  }
};