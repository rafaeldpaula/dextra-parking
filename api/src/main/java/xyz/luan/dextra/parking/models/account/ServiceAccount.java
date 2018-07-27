package xyz.luan.dextra.parking.models.account;

import io.yawp.repository.IdRef;
import io.yawp.repository.annotations.Endpoint;
import io.yawp.repository.annotations.Id;
import io.yawp.repository.annotations.Index;
import lombok.Data;

@Data
@Endpoint(path = "/accounts")
public class ServiceAccount {

    @Id
    private IdRef<ServiceAccount> id;

    @Index(normalize = false)
    private String user;

    private String password;
}
