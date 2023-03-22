# from simmo.core import cout_mensualite,cout_total_interets, amortissement, tableau_amortissement
# from simmo.utils import taux_mensuel

# def test_cout_mensualite():
#     C0 = 200000
#     Ta = 1.2
#     Nr = 240
#     M = cout_mensualite(C0, Ta, Nr)
#     assert round(M) == 937

# def test_cout_total_interets():
#     C0 = 200000
#     Ta = 1.2
#     Nr = 240
#     I = cout_total_interets(C0, Ta, Nr)
#     assert round(I) == 24917

# def test_amortissement():
#     C = 150000
#     M = cout_mensualite(C, 1.10, 240)
#     Tp = taux_mensuel(1.10)
#     a = amortissement(C, M, Tp)

#     assert round(a[0]) == 137
#     assert round(a[1]) == 559
#     assert round(a[2]) == 149304
#     print(a)

# def test_tableau_amortissement():
#     C0 = 150000
#     M = cout_mensualite(C0, 1.10, 240)
#     Tp = taux_mensuel(1.10)
#     tab_amort = tableau_amortissement(C0, M, Tp, 240)
#     assert len(tab_amort) ==  240
#     assert round(tab_amort[-1][-1]) == 0
