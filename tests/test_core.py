from simmo.core import cout_mensualite


def test_cout_mensualite():
    C0 = 200000
    Ta = 1.2
    Nr = 240
    M = cout_mensualite(C0, Ta, Nr)
    assert M == 937.20