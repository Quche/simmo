from core.project.utils import compute_monthly_loan_rate, compute_monthly_payment

# from core.generic.quantities import calcul_taux_endettement, calcul_mensualite

def test_compute_monthly_loan_rate():
    assert round(compute_monthly_loan_rate(1.2),4) == 0.0995
    assert compute_monthly_loan_rate(0) == 0

def test_compute_monthly_payment():
    assert round(compute_monthly_payment(100000, 0.5, 20*12),2) == 716.43

def test_compute_monthly_payment_with_zero_loan_amount():
    assert compute_monthly_payment(0, 0.5, 20*12) == 0
    assert compute_monthly_payment(0, 0.5, 40*12) == 0
    