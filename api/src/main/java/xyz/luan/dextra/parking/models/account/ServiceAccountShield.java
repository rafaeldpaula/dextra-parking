package xyz.luan.dextra.parking.models.account;

import io.yawp.repository.shields.Shield;

public class ServiceAccountShield extends Shield<ServiceAccount> {

    @Override
    public void defaults() {
        allow(false);
    }
}
